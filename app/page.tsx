"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import EnhancedQuestionScreen from "@/components/enhanced-question-screen"
import EnhancedFeedbackScreen from "@/components/enhanced-feedback-screen"
import WelcomeScreen from "@/components/welcome-screen"
import Header from "@/components/header"
import type { Question, UserAnswer } from "@/types/question"

export default function SentenceConstruction() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [streak, setStreak] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [timeBonus, setTimeBonus] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  // Set time based on difficulty
  useEffect(() => {
    if (difficulty === "easy") setTimeLeft(45)
    else if (difficulty === "medium") setTimeLeft(30)
    else setTimeLeft(20)
  }, [difficulty])

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // In a real application, you would fetch from your JSON server
        // For this demo, we'll use mock data
        const response = await fetch("/api/questions")
        const data = await response.json()
        setQuestions(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
        // Use mock data as fallback
        setQuestions(mockQuestions)
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Timer effect
  useEffect(() => {
    if (isLoading || quizCompleted || showWelcome) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleNextQuestion()
          return getDifficultyTime()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex, isLoading, quizCompleted, showWelcome])

  const getDifficultyTime = () => {
    if (difficulty === "easy") return 45
    if (difficulty === "medium") return 30
    return 20
  }

  const handleAnswerSubmit = (selectedWords: string[], timeRemaining: number) => {
    const currentQuestion = questions[currentQuestionIndex]

    // Check if answer is correct
    const isCorrect = currentQuestion.correctAnswers.every(
      (answer, index) => answer.toLowerCase() === selectedWords[index]?.toLowerCase(),
    )

    // Update streak
    if (isCorrect) {
      setStreak((prev) => prev + 1)

      // Calculate time bonus (more time left = more bonus)
      const maxTime = getDifficultyTime()
      const thisTimeBonus = (timeRemaining / maxTime) * 0.5
      setTimeBonus((prev) => prev + thisTimeBonus)
    } else {
      setStreak(0)
    }

    // Save user's answer
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.sentence,
        userAnswer: selectedWords,
        correctAnswer: currentQuestion.correctAnswers,
        isCorrect,
      },
    ])
  }

  const handleNextQuestion = () => {
    // If user hasn't answered current question, save empty answer
    if (userAnswers.length <= currentQuestionIndex) {
      handleAnswerSubmit([], 0)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeLeft(getDifficultyTime())
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setTimeLeft(getDifficultyTime())
    setQuizCompleted(false)
    setShowWelcome(true)
    setStreak(0)
    setHintsUsed(0)
    setTimeBonus(0)
  }

  const startQuiz = (selectedDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(selectedDifficulty)
    setShowWelcome(false)
    setTimeLeft(selectedDifficulty === "easy" ? 45 : selectedDifficulty === "medium" ? 30 : 20)
  }

  const handleHintUsed = () => {
    setHintsUsed((prev) => prev + 1)
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={startQuiz} />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-3xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xl">Loading questions...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        difficulty={difficulty}
        streak={streak}
        hintsUsed={hintsUsed}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="container mx-auto py-8 px-4 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-2">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {quizCompleted ? "Quiz Results" : "Complete the Sentence"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Streak: {streak}</span>
                  </div>
                </div>
                <Progress
                  value={(timeLeft / getDifficultyTime()) * 100}
                  className={`mb-6 h-2 ${timeLeft <= 10 ? "animate-pulse" : ""}`}
                />

                {questions.length > 0 && (
                  <EnhancedQuestionScreen
                    question={questions[currentQuestionIndex]}
                    onSubmit={handleAnswerSubmit}
                    timeLeft={timeLeft}
                    difficulty={difficulty}
                    onHintUsed={handleHintUsed}
                    hintsRemaining={3 - hintsUsed}
                  />
                )}
              </>
            ) : (
              <EnhancedFeedbackScreen
                userAnswers={userAnswers}
                totalQuestions={questions.length}
                hintsUsed={hintsUsed}
                timeBonus={timeBonus}
                onRestart={restartQuiz}
              />
            )}
          </CardContent>
          {!quizCompleted && (
            <CardFooter className="flex justify-end">
              <Button onClick={handleNextQuestion} disabled={userAnswers.length <= currentQuestionIndex}>
                {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}

// Mock data for demonstration
const mockQuestions: Question[] = [
  {
    id: 1,
    sentence: "The quick brown fox ___ over the lazy ___.",
    options: ["jumps", "dog", "runs", "cat"],
    correctAnswers: ["jumps", "dog"],
    blanks: 2,
  },
  {
    id: 2,
    sentence: "She ___ to the store to ___ some groceries.",
    options: ["went", "buy", "walked", "get"],
    correctAnswers: ["went", "buy"],
    blanks: 2,
  },
  {
    id: 3,
    sentence: "The ___ rises in the ___ and sets in the west.",
    options: ["sun", "east", "moon", "sky"],
    correctAnswers: ["sun", "east"],
    blanks: 2,
  },
  {
    id: 4,
    sentence: "I ___ my homework before I ___ to bed.",
    options: ["finished", "went", "did", "slept"],
    correctAnswers: ["finished", "went"],
    blanks: 2,
  },
  {
    id: 5,
    sentence: "The ___ is the largest ___ in our solar system.",
    options: ["sun", "star", "moon", "planet"],
    correctAnswers: ["sun", "star"],
    blanks: 2,
  },
]
