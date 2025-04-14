"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb, Clock } from "lucide-react"
import type { Question } from "@/types/question"
import confetti from "canvas-confetti"

interface EnhancedQuestionScreenProps {
  question: Question
  onSubmit: (selectedWords: string[], timeRemaining: number) => void
  timeLeft: number
  difficulty: "easy" | "medium" | "hard"
  onHintUsed: () => void
  hintsRemaining: number
}

export default function EnhancedQuestionScreen({
  question,
  onSubmit,
  timeLeft,
  difficulty,
  onHintUsed,
  hintsRemaining,
}: EnhancedQuestionScreenProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>(Array(question.blanks).fill(""))
  const [availableOptions, setAvailableOptions] = useState<string[]>([...question.options])
  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { toast } = useToast()

  // Reset state when question changes
  useEffect(() => {
    setSelectedWords(Array(question.blanks).fill(""))
    setAvailableOptions([...question.options])
    setUsedIndices([])
    setIsCorrect(null)
    setHasSubmitted(false)
  }, [question])

  // Auto-submit when all blanks are filled
  useEffect(() => {
    if (selectedWords.every((word) => word !== "") && !hasSubmitted) {
      checkAnswer()
    }
  }, [selectedWords])

  // Time warning effect
  useEffect(() => {
    if (timeLeft === 10 && !hasSubmitted) {
      toast({
        title: "Time is running out!",
        description: "Only 10 seconds remaining.",
        variant: "destructive",
      })
    }
  }, [timeLeft, toast, hasSubmitted])

  const handleSelectWord = (word: string, index: number) => {
    // Find first empty blank
    const blankIndex = selectedWords.findIndex((w) => w === "")

    if (blankIndex !== -1) {
      const newSelectedWords = [...selectedWords]
      newSelectedWords[blankIndex] = word
      setSelectedWords(newSelectedWords)

      // Mark this option as used
      setUsedIndices((prev) => [...prev, index])

      // Play sound effect
      playSelectSound()
    }
  }

  const handleRemoveWord = (blankIndex: number) => {
    if (selectedWords[blankIndex] !== "") {
      const removedWord = selectedWords[blankIndex]

      // Find the original index of this word in options
      const originalIndex = question.options.findIndex((w) => w === removedWord)

      // Remove from used indices
      setUsedIndices((prev) => prev.filter((i) => i !== originalIndex))

      // Remove from selected words
      const newSelectedWords = [...selectedWords]
      newSelectedWords[blankIndex] = ""
      setSelectedWords(newSelectedWords)

      // Play sound effect
      playRemoveSound()
    }
  }

  const checkAnswer = () => {
    setHasSubmitted(true)

    // Check if answer is correct
    const correct = question.correctAnswers.every(
      (answer, index) => answer.toLowerCase() === selectedWords[index]?.toLowerCase(),
    )

    setIsCorrect(correct)

    if (correct) {
      // Play success sound and show confetti
      playSuccessSound()
      triggerConfetti()

      toast({
        title: "Correct!",
        description: "Great job! Moving to next question...",
        variant: "success",
      })
    } else {
      // Play error sound
      playErrorSound()

      toast({
        title: "Incorrect",
        description: "That's not quite right. Try again!",
        variant: "destructive",
      })
    }

    // Submit the answer after a delay to show feedback
    setTimeout(
      () => {
        onSubmit(selectedWords, timeLeft)
      },
      correct ? 1500 : 2000,
    )
  }

  const useHint = () => {
    if (hintsRemaining <= 0) return

    // Find first empty blank
    const blankIndex = selectedWords.findIndex((w) => w === "")

    if (blankIndex !== -1) {
      const correctWord = question.correctAnswers[blankIndex]
      const wordIndex = question.options.findIndex((w) => w === correctWord)

      if (wordIndex !== -1) {
        handleSelectWord(correctWord, wordIndex)
        onHintUsed()

        toast({
          title: "Hint Used",
          description: `Hint applied: "${correctWord}"`,
          variant: "default",
        })
      }
    }
  }

  // Split the sentence into parts based on blanks
  const sentenceParts = question.sentence.split("___")

  // Sound effects (these would be implemented with actual audio in a real app)
  const playSelectSound = () => {
    // In a real app, you would play an audio file here
    console.log("Playing select sound")
  }

  const playRemoveSound = () => {
    // In a real app, you would play an audio file here
    console.log("Playing remove sound")
  }

  const playSuccessSound = () => {
    // In a real app, you would play an audio file here
    console.log("Playing success sound")
  }

  const playErrorSound = () => {
    // In a real app, you would play an audio file here
    console.log("Playing error sound")
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant={difficulty === "easy" ? "default" : difficulty === "medium" ? "secondary" : "destructive"}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className={`font-mono ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>{timeLeft}s</span>
        </div>
      </div>

      <div className="p-6 bg-muted rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md">
        <p className="text-lg leading-relaxed">
          {sentenceParts.map((part, index) => (
            <span key={index}>
              {part}
              {index < sentenceParts.length - 1 && (
                <span
                  className={`inline-block min-w-20 mx-1 px-3 py-1 border-b-2 text-center rounded transition-all duration-200 ${
                    selectedWords[index]
                      ? isCorrect === null
                        ? "bg-primary/10 border-primary cursor-pointer hover:bg-primary/20"
                        : isCorrect
                          ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                          : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                      : "border-dashed border-gray-400 animate-pulse"
                  }`}
                  onClick={() => !hasSubmitted && handleRemoveWord(index)}
                >
                  {selectedWords[index] || "____"}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={usedIndices.includes(index) ? "outline" : "default"}
            className={`transition-all duration-200 ${
              usedIndices.includes(index) ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-md"
            }`}
            disabled={usedIndices.includes(index) || hasSubmitted}
            onClick={() => handleSelectWord(option, index)}
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={useHint}
          disabled={hintsRemaining <= 0 || hasSubmitted}
          className="flex items-center gap-2"
        >
          <Lightbulb className="h-4 w-4" />
          Hint ({hintsRemaining})
        </Button>

        {selectedWords.some((word) => word === "") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Fill with random words for testing
              const newSelectedWords = [...selectedWords]
              for (let i = 0; i < newSelectedWords.length; i++) {
                if (newSelectedWords[i] === "") {
                  // Find an unused option
                  const unusedOptions = question.options.filter((_, idx) => !usedIndices.includes(idx))
                  if (unusedOptions.length > 0) {
                    const randomOption = unusedOptions[Math.floor(Math.random() * unusedOptions.length)]
                    const optionIndex = question.options.findIndex((opt) => opt === randomOption)
                    newSelectedWords[i] = randomOption
                    setUsedIndices((prev) => [...prev, optionIndex])
                  }
                }
              }
              setSelectedWords(newSelectedWords)
            }}
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  )
}
