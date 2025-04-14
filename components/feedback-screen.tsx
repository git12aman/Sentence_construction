"use client"

import { useState, useEffect } from "react"
import type { UserAnswer } from "@/types/question"
import { CheckCircle, XCircle, Trophy, Award, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface FeedbackScreenProps {
  userAnswers: UserAnswer[]
  totalQuestions: number
  difficulty: string
  hintsUsed: number
  onRestart: () => void
  onChangeDifficulty: () => void
}

export default function FeedbackScreen({
  userAnswers,
  totalQuestions,
  difficulty,
  hintsUsed,
  onRestart,
  onChangeDifficulty,
}: FeedbackScreenProps) {
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length
  const baseScore = Math.round((correctAnswers / totalQuestions) * 10)

  // Calculate bonus points based on difficulty and hints used
  const difficultyBonus = difficulty === "hard" ? 2 : difficulty === "medium" ? 1 : 0
  const hintPenalty = hintsUsed * 0.5

  const finalScore = Math.max(0, Math.min(10, baseScore + difficultyBonus - hintPenalty))
  const [progressValue, setProgressValue] = useState(0)

  // Animate the progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(finalScore * 10)
    }, 500)
    return () => clearTimeout(timer)
  }, [finalScore])

  const getScoreMessage = () => {
    if (finalScore >= 9) return "Outstanding! You're a sentence master!"
    if (finalScore >= 7) return "Great job! You have excellent language skills!"
    if (finalScore >= 5) return "Good effort! Keep practicing to improve!"
    return "Keep practicing! You'll get better with time."
  }

  const getScoreIcon = () => {
    if (finalScore >= 9) return <Trophy className="h-12 w-12 text-yellow-500" />
    if (finalScore >= 7) return <Award className="h-12 w-12 text-blue-500" />
    if (finalScore >= 5) return <Medal className="h-12 w-12 text-green-500" />
    return <Medal className="h-12 w-12 text-gray-500" />
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex justify-center mb-4">{getScoreIcon()}</div>
        <h2 className="text-3xl font-bold mb-2">Your Score: {finalScore.toFixed(1)}/10</h2>
        <p className="text-muted-foreground mb-4">{getScoreMessage()}</p>

        <div className="w-full max-w-md mx-auto mb-6">
          <Progress value={progressValue} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6 text-center">
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{totalQuestions - correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{hintsUsed}</div>
            <div className="text-xs text-muted-foreground">Hints Used</div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All Questions</TabsTrigger>
          <TabsTrigger value="correct">Correct</TabsTrigger>
          <TabsTrigger value="incorrect">Incorrect</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {userAnswers.map((answer, index) => (
            <AnswerCard key={index} answer={answer} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="correct" className="space-y-4">
          {userAnswers
            .filter((answer) => answer.isCorrect)
            .map((answer, index) => (
              <AnswerCard key={index} answer={answer} index={index} />
            ))}
        </TabsContent>

        <TabsContent value="incorrect" className="space-y-4">
          {userAnswers
            .filter((answer) => !answer.isCorrect)
            .map((answer, index) => (
              <AnswerCard key={index} answer={answer} index={index} />
            ))}
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button onClick={onRestart} className="flex-1">
          Try Again
        </Button>
        <Button onClick={onChangeDifficulty} variant="outline" className="flex-1">
          Change Difficulty
        </Button>
      </div>
    </div>
  )
}

function AnswerCard({ answer, index }: { answer: UserAnswer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-lg border ${
        answer.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-start gap-2">
        {answer.isCorrect ? (
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
        )}
        <div>
          <p className="font-medium mb-2">Question {index + 1}:</p>
          <p className="mb-2">{formatSentenceWithAnswers(answer.question, answer.userAnswer)}</p>

          {!answer.isCorrect && (
            <div className="mt-2 p-2 bg-white/50 rounded border border-red-100">
              <p className="text-sm font-medium text-muted-foreground">Correct answer:</p>
              <p className="text-sm">{formatSentenceWithAnswers(answer.question, answer.correctAnswer)}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function formatSentenceWithAnswers(sentence: string, answers: string[]): string {
  let formattedSentence = sentence
  answers.forEach((answer, index) => {
    const replacement = answer
      ? `<span class="font-medium px-1 rounded bg-primary/10">${answer}</span>`
      : '<span class="text-red-500">____</span>'
    formattedSentence = formattedSentence.replace("___", replacement)
  })
  return formattedSentence
}
