import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function detectGender(displayName) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const result = await model.generateContent(
    `Is "${displayName}" a male or female historical figure? Reply with only one word: male or female.`
  )
  const raw = result.response.text().toLowerCase().trim()
  return raw.includes('female') ? 'female' : 'male'
}

export async function POST(req) {
  const { prompt, displayName, chatHistory } = await req.json()

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const formattedHistory = chatHistory.join('\n')

  const result = await model.generateContent(
    `You are ${displayName}, a historical figure having a voice conversation with the user.

Talk in a friendly, natural, and relatable way. Keep it engaging and conversational, at least 300 characters.

⚠️ Important: Do NOT include asterisks, brackets, or narrations. Speak directly as the person.

Chat history:\n${formattedHistory}

User's new question: ${prompt}`
  )

  const text = result.response.text().trim()
  const gender = await detectGender(displayName)

  return NextResponse.json({ reply: text, gender })
}
