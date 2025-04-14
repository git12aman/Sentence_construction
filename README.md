# Sentence Construction Quiz

![Sentence Construction Quiz](https://github.com/yourusername/sentence-construction-quiz/raw/main/public/screenshots/hero.png)

An interactive web application that helps users practice sentence construction by filling in blanks with appropriate words. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Interactive Quiz Interface**: Fill in blanks with word options to complete sentences
- **Multiple Difficulty Levels**: Choose between easy, medium, and hard modes
- **Timed Challenges**: Race against the clock with difficulty-based time limits
- **Hint System**: Get assistance when stuck (with score penalties)
- **Detailed Feedback**: Review your answers with comprehensive feedback
- **Streak Counter**: Build and maintain streaks for consecutive correct answers
- **Score System**: Earn points based on correct answers, time remaining, and difficulty
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **Animations & Effects**: Engaging visual feedback and confetti celebrations

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sentence-construction-quiz.git
   cd sentence-construction-quiz

### GitHub Documentation for Sentence Construction Quiz

Here's a comprehensive GitHub documentation package for your Sentence Construction Quiz application.

## README.md

```markdown
# Sentence Construction Quiz

![Sentence Construction Quiz](https://github.com/yourusername/sentence-construction-quiz/raw/main/public/screenshots/hero.png)

An interactive web application that helps users practice sentence construction by filling in blanks with appropriate words. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Interactive Quiz Interface**: Fill in blanks with word options to complete sentences
- **Multiple Difficulty Levels**: Choose between easy, medium, and hard modes
- **Timed Challenges**: Race against the clock with difficulty-based time limits
- **Hint System**: Get assistance when stuck (with score penalties)
- **Detailed Feedback**: Review your answers with comprehensive feedback
- **Streak Counter**: Build and maintain streaks for consecutive correct answers
- **Score System**: Earn points based on correct answers, time remaining, and difficulty
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **Animations & Effects**: Engaging visual feedback and confetti celebrations

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/yourusername/sentence-construction-quiz/raw/main/public/screenshots/welcome.png" alt="Welcome Screen" width="45%">
  <img src="https://github.com/yourusername/sentence-construction-quiz/raw/main/public/screenshots/quiz.png" alt="Quiz Screen" width="45%">
  <img src="https://github.com/yourusername/sentence-construction-quiz/raw/main/public/screenshots/feedback.png" alt="Feedback Screen" width="45%">
  <img src="https://github.com/yourusername/sentence-construction-quiz/raw/main/public/screenshots/dark-mode.png" alt="Dark Mode" width="45%">
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sentence-construction-quiz.git
   cd sentence-construction-quiz
```

2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


### Setting up the JSON Server (Optional)

For development with local data:

1. Install JSON Server:

```shellscript
npm install -g json-server
```


2. Create a `db.json` file in the root directory with your questions data.
3. Run JSON Server:

```shellscript
json-server --watch db.json --port 3001
```


4. Update the fetch URL in `app/page.tsx` to point to your JSON server:

```typescript
const response = await fetch('http://localhost:3001/questions')
```




## 🛠️ Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Framer Motion**: Animation library
- **Canvas Confetti**: Celebration effects
- **Radix UI**: Accessible UI primitives
- **Lucide Icons**: Beautiful SVG icons


## 📁 Project Structure

```plaintext
sentence-construction-quiz/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── enhanced-question-screen.tsx
│   ├── enhanced-feedback-screen.tsx
│   ├── welcome-screen.tsx
│   ├── header.tsx
│   └── ui/                 # UI components from shadcn
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 🧩 Core Components

### Question Screen

Displays the current question with blanks to fill in and word options to choose from.

### Feedback Screen

Shows results after completing the quiz, including correct/incorrect answers and score breakdown.

### Welcome Screen

Introduces the application and allows users to select difficulty level.

## 🔧 Customization

### Adding Questions

Add or modify questions in the `app/api/questions/route.ts` file:

```typescript
const questions: Question[] = [
  {
    id: 1,
    sentence: "Your sentence with ___ blanks.",
    options: ["word1", "word2", "word3", "word4"],
    correctAnswers: ["word1", "word3"],
    blanks: 2,
    hint: "Optional hint for this question"
  },
  // Add more questions...
]
```

### Modifying Difficulty Levels

Adjust time limits and question complexity in the `app/page.tsx` file:

```typescript
const getDifficultyTime = () => {
  if (difficulty === "easy") return 45
  if (difficulty === "medium") return 30
  return 20
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)


```plaintext

## CONTRIBUTING.md

```markdown
# Contributing to Sentence Construction Quiz

Thank you for considering contributing to the Sentence Construction Quiz! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template when creating a new issue
- Include detailed steps to reproduce the bug
- Include screenshots if applicable
- Specify your browser and operating system

### Suggesting Enhancements

- Check if the enhancement has already been suggested in the Issues section
- Use the feature request template when creating a new issue
- Provide a clear description of the enhancement
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sentence-construction-quiz.git
   cd sentence-construction-quiz
```

2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```




## Coding Guidelines

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Use async/await for asynchronous operations


### React Components

- Use functional components with hooks
- Keep components focused on a single responsibility
- Use proper prop types
- Follow the component structure in the project


### CSS/Tailwind

- Use Tailwind utility classes
- Follow the existing design system
- Ensure responsive design works on all screen sizes


## Testing

- Write tests for new features
- Ensure all tests pass before submitting a pull request
- Test on different browsers and devices if possible


## Documentation

- Update the README.md if necessary
- Document new features or changes
- Add comments to your code


Thank you for contributing to the Sentence Construction Quiz!

```plaintext

## CODE_OF_CONDUCT.md

```markdown
# Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Project maintainers are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the project maintainers responsible for enforcement at
[INSERT EMAIL ADDRESS].
All complaints will be reviewed and investigated promptly and fairly.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org),
version 2.0, available at
https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.
```

## LICENSE

```markdown
MIT License

Copyright (c) 2023 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## .github/ISSUE_TEMPLATE/bug_report.md

```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment (please complete the following information):**
 - Device: [e.g. Desktop, iPhone 12]
 - OS: [e.g. Windows 10, iOS 15]
 - Browser: [e.g. Chrome 96, Safari 15]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## .github/ISSUE_TEMPLATE/feature_request.md

```markdown
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## .github/pull_request_template.md

```markdown
## Description
Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context.

Fixes # (issue)

## Type of change
Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce.

- [ ] Test A
- [ ] Test B

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## JSDoc Comments for Key Files

Here are examples of JSDoc comments you should add to your key files:

### app/page.tsx

```typescript
/**
 * Main application component for the Sentence Construction Quiz
 * 
 * This component manages the overall state and flow of the quiz application,
 * including fetching questions, tracking user progress, managing the timer,
 * and coordinating between different screens (welcome, questions, feedback).
 * 
 * @returns {JSX.Element} The rendered application
 */
export default function SentenceConstruction() {
  // ...
}
```

### components/enhanced-question-screen.tsx

```typescript
/**
 * Enhanced question screen component that displays the current question
 * with interactive word selection functionality
 * 
 * @param {EnhancedQuestionScreenProps} props - Component props
 * @param {Question} props.question - The current question object
 * @param {Function} props.onSubmit - Callback function when answer is submitted
 * @param {number} props.timeLeft - Remaining time for the question
 * @param {"easy"|"medium"|"hard"} props.difficulty - Current difficulty level
 * @param {Function} props.onHintUsed - Callback function when hint is used
 * @param {number} props.hintsRemaining - Number of hints remaining
 * 
 * @returns {JSX.Element} The rendered question screen
 */
export default function EnhancedQuestionScreen({
  question,
  onSubmit,
  timeLeft,
  difficulty,
  onHintUsed,
  hintsRemaining,
}: EnhancedQuestionScreenProps) {
  // ...
}
```

### components/enhanced-feedback-screen.tsx

```typescript
/**
 * Enhanced feedback screen component that displays quiz results
 * with detailed statistics and answer review
 * 
 * @param {EnhancedFeedbackScreenProps} props - Component props
 * @param {UserAnswer[]} props.userAnswers - Array of user answers
 * @param {number} props.totalQuestions - Total number of questions
 * @param {number} props.hintsUsed - Number of hints used
 * @param {number} props.timeBonus - Time bonus points
 * @param {Function} props.onRestart - Callback function to restart quiz
 * 
 * @returns {JSX.Element} The rendered feedback screen
 */
export default function EnhancedFeedbackScreen({
  userAnswers,
  totalQuestions,
  hintsUsed,
  timeBonus,
  onRestart,
}: EnhancedFeedbackScreenProps) {
  // ...
}
```

## Project Structure Documentation

```markdown
# Project Structure

This document provides an overview of the project structure and the purpose of each file and directory.

## Root Directory

- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `next.config.mjs`: Next.js configuration
- `README.md`: Project documentation
- `LICENSE`: Project license
- `CONTRIBUTING.md`: Contributing guidelines
- `CODE_OF_CONDUCT.md`: Code of conduct

## App Directory

- `app/page.tsx`: Main application component
- `app/layout.tsx`: Root layout component
- `app/globals.css`: Global styles
- `app/api/questions/route.ts`: API route for fetching questions

## Components Directory

- `components/enhanced-question-screen.tsx`: Question display and interaction
- `components/enhanced-feedback-screen.tsx`: Results and feedback display
- `components/welcome-screen.tsx`: Welcome and difficulty selection
- `components/header.tsx`: Application header with navigation and theme toggle

### UI Components

- `components/ui/`: shadcn UI components
  - `button.tsx`: Button component
  - `card.tsx`: Card component
  - `progress.tsx`: Progress bar component
  - `badge.tsx`: Badge component
  - `toast.tsx`: Toast notification component
  - `sheet.tsx`: Sheet/drawer component
  - `tabs.tsx`: Tabs component
  - ... (other UI components)

## Types Directory

- `types/question.ts`: TypeScript types for questions and answers

## Hooks Directory

- `hooks/use-toast.ts`: Custom hook for toast notifications
- `hooks/use-mobile.tsx`: Custom hook for mobile detection

## Lib Directory

- `lib/utils.ts`: Utility functions
```

This comprehensive documentation package provides everything needed for a professional GitHub repository. It includes:

1. A detailed README with features, screenshots, installation instructions, and project structure
2. Contributing guidelines
3. Code of conduct
4. License information
5. Issue templates for bug reports and feature requests
6. Pull request template
7. JSDoc comments for key files
8. Detailed project structure documentation
