import { type NextRequest, NextResponse } from "next/server"
import type { Question } from "@/types/question"

// This is a mock API endpoint that would normally fetch from your JSON server
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const difficulty = searchParams.get("difficulty") || "medium"

  // In a real application, you would fetch from your JSON server with the selected difficulty
  const questions: Question[] = [
    {
      id: 1,
      sentence: "The quick brown fox ___ over the lazy ___.",
      options: ["jumps", "dog", "runs", "cat"],
      correctAnswers: ["jumps", "dog"],
      blanks: 2,
      hint: "Think about a common phrase used to test typing skills.",
    },
    {
      id: 2,
      sentence: "She ___ to the store to ___ some groceries.",
      options: ["went", "buy", "walked", "get"],
      correctAnswers: ["went", "buy"],
      blanks: 2,
      hint: "The first blank is a past tense verb of movement.",
    },
    {
      id: 3,
      sentence: "The ___ rises in the ___ and sets in the west.",
      options: ["sun", "east", "moon", "sky"],
      correctAnswers: ["sun", "east"],
      blanks: 2,
      hint: "This is about a daily astronomical event.",
    },
    {
      id: 4,
      sentence: "I ___ my homework before I ___ to bed.",
      options: ["finished", "went", "did", "slept"],
      correctAnswers: ["finished", "went"],
      blanks: 2,
      hint: "The second blank is about going somewhere.",
    },
    {
      id: 5,
      sentence: "The ___ is the largest ___ in our solar system.",
      options: ["sun", "star", "moon", "planet"],
      correctAnswers: ["sun", "star"],
      blanks: 2,
      hint: "The first blank is the center of our solar system.",
    },
    {
      id: 6,
      sentence: "Please ___ your shoes before ___ inside.",
      options: ["remove", "entering", "take", "coming"],
      correctAnswers: ["remove", "entering"],
      blanks: 2,
      hint: "This is about etiquette when visiting someone's home.",
    },
    {
      id: 7,
      sentence: "The chef ___ the vegetables before ___ them in the soup.",
      options: ["chopped", "adding", "cut", "putting"],
      correctAnswers: ["chopped", "adding"],
      blanks: 2,
      hint: "The first blank is about preparing ingredients.",
    },
    {
      id: 8,
      sentence: "She ___ her keys and couldn't ___ her car.",
      options: ["lost", "start", "misplaced", "find"],
      correctAnswers: ["lost", "start"],
      blanks: 2,
      hint: "The second blank is about operating a vehicle.",
    },
    {
      id: 9,
      sentence: "The movie was so ___ that everyone in the theater was ___.",
      options: ["boring", "sleeping", "funny", "laughing"],
      correctAnswers: ["funny", "laughing"],
      blanks: 2,
      hint: "This is about a positive reaction to entertainment.",
    },
    {
      id: 10,
      sentence: "The ___ was so hot that the ___ melted quickly.",
      options: ["day", "ice cream", "sun", "chocolate"],
      correctAnswers: ["day", "ice cream"],
      blanks: 2,
      hint: "The second blank is a frozen dessert.",
    },
  ]

  // Adjust difficulty by modifying options or time
  if (difficulty === "easy") {
    return NextResponse.json(
      questions.map((q) => ({
        ...q,
        options: q.options.filter((_, i) => i < 3), // Fewer options for easy mode
      })),
    )
  } else if (difficulty === "hard") {
    // For hard mode, add more similar options to make it challenging
    return NextResponse.json(
      questions.map((q) => {
        const moreOptions = [...q.options]
        if (q.id % 2 === 0) {
          moreOptions.push("quickly", "carefully")
        } else {
          moreOptions.push("slowly", "quietly")
        }
        return {
          ...q,
          options: moreOptions.slice(0, 6), // More options for hard mode
          sentence: q.sentence.replace("___", "____"), // Visual change to make it look harder
        }
      }),
    )
  }

  return NextResponse.json(questions)
}
