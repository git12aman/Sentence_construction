export interface Question {
  id: number
  sentence: string
  options: string[]
  correctAnswers: string[]
  blanks: number
  hint?: string
}

export interface UserAnswer {
  questionId: number
  question: string
  userAnswer: string[]
  correctAnswer: string[]
  isCorrect: boolean
}
