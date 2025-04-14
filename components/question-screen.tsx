"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LightbulbIcon } from "lucide-react"
import { motion } from "framer-motion"
import type { Question } from "@/types/question"

interface QuestionScreenProps {
  question: Question
  onSubmit: (selectedWords: string[]) => void
  timeLeft: number
  showHint: boolean
  onUseHint: () => void
  hintsRemaining: number
}

export default function QuestionScreen({
  question,
  onSubmit,
  timeLeft,
  showHint,
  onUseHint,
  hintsRemaining,
}: QuestionScreenProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>(Array(question.blanks).fill(""))
  const [availableOptions, setAvailableOptions] = useState<string[]>([...question.options])
  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [animateBlank, setAnimateBlank] = useState<number | null>(null)

  // Reset state when question changes
  useEffect(() => {
    setSelectedWords(Array(question.blanks).fill(""))
    setAvailableOptions([...question.options])
    setUsedIndices([])
  }, [question])

  // Auto-submit when all blanks are filled
  useEffect(() => {
    if (selectedWords.every((word) => word !== "")) {
      onSubmit(selectedWords)
    }
  }, [selectedWords, onSubmit])

  const handleSelectWord = (word: string, index: number) => {
    // Find first empty blank
    const blankIndex = selectedWords.findIndex((w) => w === "")

    if (blankIndex !== -1) {
      const newSelectedWords = [...selectedWords]
      newSelectedWords[blankIndex] = word
      setSelectedWords(newSelectedWords)

      // Animate the blank that was just filled
      setAnimateBlank(blankIndex)
      setTimeout(() => setAnimateBlank(null), 500)

      // Mark this option as used
      setUsedIndices((prev) => [...prev, index])
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
    }
  }

  // Split the sentence into parts based on blanks
  const sentenceParts = question.sentence.split("___")

  return (
    <div className="space-y-6">
      <div className="p-6 bg-muted rounded-lg shadow-sm">
        <p className="text-xl leading-relaxed">
          {sentenceParts.map((part, index) => (
            <span key={index}>
              {part}
              {index < sentenceParts.length - 1 && (
                <motion.span
                  animate={animateBlank === index ? { scale: [1, 1.1, 1] } : {}}
                  className={`inline-block min-w-24 mx-1 px-3 py-1 border-b-2 text-center rounded ${
                    selectedWords[index]
                      ? "bg-primary/10 border-primary cursor-pointer font-medium"
                      : "border-dashed border-gray-400"
                  }`}
                  onClick={() => handleRemoveWord(index)}
                >
                  {selectedWords[index] || "____"}
                </motion.span>
              )}
            </span>
          ))}
        </p>
      </div>

      {showHint && question.hint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <p className="flex items-center gap-2 text-yellow-800">
            <LightbulbIcon className="h-5 w-5" />
            <span>Hint: {question.hint}</span>
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={usedIndices.includes(index) ? "outline" : "default"}
              className={`w-full ${usedIndices.includes(index) ? "opacity-50 cursor-not-allowed" : "hover:scale-105 transition-transform"}`}
              disabled={usedIndices.includes(index)}
              onClick={() => handleSelectWord(option, index)}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={onUseHint}
          disabled={hintsRemaining <= 0 || showHint}
          className="flex items-center gap-2"
        >
          <LightbulbIcon className="h-4 w-4" />
          Use Hint ({hintsRemaining} left)
        </Button>

        <Badge variant="outline" className={timeLeft <= 10 ? "animate-pulse text-red-500" : ""}>
          {timeLeft}s remaining
        </Badge>
      </div>
    </div>
  )
}
