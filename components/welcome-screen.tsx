"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BookOpen, Clock, Lightbulb, Award } from "lucide-react"

interface WelcomeScreenProps {
  onStart: (difficulty: "easy" | "medium" | "hard") => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("medium")

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-2">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Sentence Construction
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Test your language skills by completing sentences with the right words
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pb-2">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center p-4 bg-muted rounded-lg"
                >
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Learn</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Improve your vocabulary and grammar skills
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center p-4 bg-muted rounded-lg"
                >
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Race Against Time</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Complete sentences before the timer runs out
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center p-4 bg-muted rounded-lg"
                >
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Track Progress</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    See your score and improve with each attempt
                  </p>
                </motion.div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center">Select Difficulty</h3>
                <Tabs
                  defaultValue="medium"
                  className="w-full"
                  onValueChange={(value) => setSelectedDifficulty(value as "easy" | "medium" | "hard")}
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>

                  <TabsContent value="easy" className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Easy Mode</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                          <li>45 seconds per question</li>
                          <li>Fewer word options</li>
                          <li>Perfect for beginners</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="medium" className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Medium Mode</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                          <li>30 seconds per question</li>
                          <li>Standard word options</li>
                          <li>Balanced challenge</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="hard" className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Hard Mode</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                          <li>20 seconds per question</li>
                          <li>More word options</li>
                          <li>For language experts</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <Button onClick={() => onStart(selectedDifficulty)} className="w-full text-lg py-6" size="lg">
              Start Quiz
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">Created with Next.js and shadcn/ui components</p>
      </motion.div>
    </div>
  )
}
