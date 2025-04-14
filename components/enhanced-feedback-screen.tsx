"use client"

import { useState } from "react"
import type { UserAnswer } from "@/types/question"
import { CheckCircle, XCircle, Share2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface EnhancedFeedbackScreenProps {
  userAnswers: UserAnswer[]
  totalQuestions: number
  hintsUsed: number
  timeBonus: number
  onRestart: () => void
}

export default function EnhancedFeedbackScreen({
  userAnswers,
  totalQuestions,
  hintsUsed,
  timeBonus,
  onRestart,
}: EnhancedFeedbackScreenProps) {
  const [activeTab, setActiveTab] = useState("summary")

  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length
  const baseScore = Math.round((correctAnswers / totalQuestions) * 10)
  const hintPenalty = hintsUsed * 0.5
  const finalScore = Math.max(0, baseScore + timeBonus - hintPenalty)

  // Calculate grade based on score
  const getGrade = (score: number) => {
    if (score >= 9) return { letter: "A", text: "Excellent!" }
    if (score >= 8) return { letter: "B", text: "Great job!" }
    if (score >= 7) return { letter: "C", text: "Good work!" }
    if (score >= 6) return { letter: "D", text: "Keep practicing!" }
    return { letter: "F", text: "Try again!" }
  }

  const grade = getGrade(finalScore)

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
          <span className="text-4xl font-bold text-primary">{finalScore.toFixed(1)}</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">{grade.text}</h2>
        <p className="text-muted-foreground mb-4">
          You got {correctAnswers} out of {totalQuestions} questions correct.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Base Score</p>
            <p className="text-xl font-medium">{baseScore.toFixed(1)}</p>
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Time Bonus</p>
            <p className="text-xl font-medium text-green-500">+{timeBonus.toFixed(1)}</p>
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Hint Penalty</p>
            <p className="text-xl font-medium text-red-500">-{hintPenalty.toFixed(1)}</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="summary" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Accuracy</span>
              <span>{Math.round((correctAnswers / totalQuestions) * 100)}%</span>
            </div>
            <Progress value={(correctAnswers / totalQuestions) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button className="flex items-center gap-2" onClick={onRestart}>
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Result
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {userAnswers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  answer.isCorrect
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                }`}
              >
                <div className="flex items-start gap-2">
                  {answer.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-2">Question {index + 1}:</p>
                    <p
                      className="mb-2"
                      dangerouslySetInnerHTML={{
                        __html: formatSentenceWithAnswers(answer.question, answer.userAnswer),
                      }}
                    />

                    {!answer.isCorrect && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-muted-foreground">Correct answer:</p>
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: formatSentenceWithAnswers(answer.question, answer.correctAnswer),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Correct</p>
                  <p className="text-2xl font-medium text-green-500">{correctAnswers}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                  <p className="text-2xl font-medium text-red-500">{totalQuestions - correctAnswers}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Hints</h3>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Hints Used</span>
                  <span>{hintsUsed}/3</span>
                </div>
                <Progress value={(hintsUsed / 3) * 100} className="h-2 mt-2" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={onRestart} className="w-full">
                Play Again
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function formatSentenceWithAnswers(sentence: string, answers: string[]): string {
  let formattedSentence = sentence
  answers.forEach((answer) => {
    formattedSentence = formattedSentence.replace(
      "___",
      `<span class="px-1 py-0.5 rounded bg-primary/10 font-medium">${answer}</span>`,
    )
  })
  return formattedSentence
}
