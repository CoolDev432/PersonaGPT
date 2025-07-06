import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  const { chatHistory, personaName } = await req.json()

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(`
You are a quiz master. Based on the following conversation with the historical figure "${personaName}", generate a 5-question multiple choice quiz.

Instructions:
- Use only info from this conversation: ${chatHistory}
- Format each question like:

Q: Who was the main inspiration of your movement?
A) Mahatma Gandhi
B) Subhas Chandra Bose
C) Bhagat Singh
D) B. R. Ambedkar
Answer: C) Bhagat Singh
`)

  const text = result.response.text()

  const rawQuestions = text
    .split(/Q\d*[:.-]/)
    .map((block) => block.trim())
    .filter((q) => q && q.includes('Answer:'))

  const quiz = rawQuestions.map((block) => {
    const lines = block.split('\n').filter(Boolean)
    const questionLine = lines[0]
    const options = lines.slice(1, 5).map((line) => line.replace(/^[A-D][\).]\s*/, '').trim())
    const answerLine = lines.find((l) => l.toLowerCase().startsWith('answer'))
    const correctOption = answerLine?.split(')').slice(1).join(')').trim()

    return {
      question: questionLine,
      options,
      answer: correctOption,
    }
  })

  return NextResponse.json({ quiz })
}
