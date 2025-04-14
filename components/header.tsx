"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, HelpCircleIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  difficulty: string
  streak: number
  hintsUsed: number
  currentQuestion: number
  totalQuestions: number
}

export default function Header({ difficulty, streak, hintsUsed, currentQuestion, totalQuestions }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="w-full py-4 px-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            SentenceQuiz
          </span>
          <span className="hidden md:inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4 mr-4">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Question:</span>
              <span className="text-sm">
                {currentQuestion}/{totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Streak:</span>
              <span className="text-sm">{streak}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Hints:</span>
              <span className="text-sm">{hintsUsed}/3</span>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircleIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>How to Play</SheetTitle>
                <SheetDescription>Complete the sentences by selecting the correct words.</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium mb-1">Rules:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Fill in the blanks with the correct words</li>
                    <li>Click on a word to select it</li>
                    <li>Click on a filled blank to remove the word</li>
                    <li>Complete the sentence before the timer runs out</li>
                    <li>Use hints sparingly for a better score</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Scoring:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Each correct answer earns points</li>
                    <li>Hard difficulty gives bonus points</li>
                    <li>Using hints reduces your final score</li>
                    <li>Maintain a streak for the best results!</li>
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
