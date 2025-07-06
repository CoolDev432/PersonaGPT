"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const QuizPage = () => {
  const [history, setHistory] = useState([])
  const [personaName, setPersonaName] = useState('')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const chat = JSON.parse(localStorage.getItem('personaChatHistory') || '[]')
    const nameFromQuery = searchParams.get('name') || ''
    setHistory(chat)
    setPersonaName(nameFromQuery)
  }, [searchParams])

  const generateQuiz = async () => {
    setLoading(true)
    const res = await fetch('/api/generateQuiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatHistory: history, personaName }),
    })

    const data = await res.json()
    // API returns { quiz: [...] }
    setQuestions(data.quiz)
    setLoading(false)
  }

  const handleAnswer = (option) => {
    if (answered) return
    setSelected(option)
    setAnswered(true)
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1)
    }
    setTimeout(() => {
      if (current + 1 === questions.length) {
        setShowResult(true)
      } else {
        setCurrent((prev) => prev + 1)
        setSelected(null)
        setAnswered(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#111] to-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-purple-400">
          Quiz Time with {personaName}!
        </h1>

        {!questions.length && !showResult && (
          <div className="mt-12 text-center">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-medium px-8 py-4 rounded-full shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              onClick={generateQuiz}
            >
              {loading ? 'Generating Quiz...' : 'Start Quiz'}
            </button>
          </div>
        )}

        {questions.length > 0 && !showResult && (
          <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg border border-purple-700">
            <h2 className="text-2xl font-bold mb-4">
              Q{current + 1}: {questions[current].question}
            </h2>
            <div className="grid gap-4">
              {questions[current].options.map((opt, idx) => {
                const isCorrect = opt === questions[current].answer
                const isSelected = opt === selected
                const baseStyle = 'p-4 rounded-xl transition text-left'
                const bgColor = !answered
                  ? 'bg-purple-800 hover:bg-purple-600'
                  : isCorrect
                  ? 'bg-green-600'
                  : isSelected
                  ? 'bg-red-600'
                  : 'bg-[#333]'
                return (
                  <button
                    key={idx}
                    className={`${baseStyle} ${bgColor}`}
                    onClick={() => handleAnswer(opt)}
                    disabled={answered}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {showResult && (
          <div className="text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Quiz Finished!</h2>
            <p className="text-xl">Your Score: {score} / {questions.length}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizPage
