import { Suspense } from 'react'
import QuizPage from './QuizPage'

export default function MainQuizPage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-20">Loading quiz...</div>}>
      <QuizPage />
    </Suspense>
  )
}
