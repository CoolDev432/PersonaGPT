'use client'

import React, { useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Mic, Volume2 } from 'lucide-react'

const PersonaChat = () => {
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const recognitionRef = useRef(null)
  const [gender, setGender] = useState(null)
  const chatHistory = useRef([])

  const params = useParams()
  const slug = decodeURIComponent(params.nameOfPersonality || '')

  const formatSlug = (slug) =>
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const displayName = formatSlug(slug)

  const voiceIds = {
    male: 'gOkFV1JMCt0G0n9xmBwV', // Replace with real IDs
    female: 'TRnaQb7q41oL7sV0w6Bu', // Replace with real IDs
  }

  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Speech Recognition not supported.')

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript
      setTranscript(userText)
      chatHistory.current.push(`user: ${userText}`)

      const res = await fetch('/api/gemini', {
        method: 'POST',
        body: JSON.stringify({ prompt: userText, displayName, chatHistory: chatHistory.current }),
      })

      const data = await res.json()
      const aiReply = data.reply
      setResponse(aiReply)
      setGender(data.gender || 'female')
      chatHistory.current.push(`ai: ${aiReply}`)

      const voiceId = voiceIds[data.gender] || voiceIds.female

      // 🎯 Detect vocal tone hints
      let stability = 0.4
      let similarity = 0.7

      if (aiReply.includes('[chuckles]')) {
        stability = 0.2 // More expressive
        similarity = 0.85
      } else if (aiReply.includes('[whispers]') || aiReply.toLowerCase().includes('whisper')) {
        stability = 0.6
        similarity = 0.6
      }

      const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
          'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: aiReply,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: stability,
            similarity_boost: similarity,
          },
        }),
      })

      if (!ttsRes.ok) {
        const error = await ttsRes.text()
        console.error('TTS error:', error)
        return alert('Voice generation failed.')
      }

      const audioContext = new AudioContext()
      const source = audioContext.createBufferSource()

      const arrayBuffer = await ttsRes.arrayBuffer()
      audioContext.decodeAudioData(arrayBuffer, (buffer) => {
        source.buffer = buffer
        source.connect(audioContext.destination)
        source.start(0)
      })
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row justify-evenly items-center bg-gradient-to-br from-[#111] via-[#0f0f0f] to-black text-white px-6 py-12 gap-10">
      <div className="bg-[#202c33] h-[60vh] w-full md:w-[40vw] rounded-3xl flex flex-col items-center p-6 shadow-xl border-green-500 border-2 relative">
        <h1 className="text-3xl font-semibold mb-1">You</h1>
        <p className="text-green-300 mb-4 text-sm italic">
          {transcript ? `"${transcript}"` : 'Tap to speak...'}
        </p>
        <button
          onClick={handleStartListening}
          className="absolute bottom-6 bg-green-600 hover:bg-green-700 hover:scale-130 p-4 rounded-full shadow-lg transition cursor-pointer"
        >
          <Mic size={28} />
        </button>
      </div>

      <div className="bg-[#202c33] h-[60vh] w-full md:w-[40vw] rounded-3xl flex flex-col items-center p-6 shadow-xl border-purple-500 border-2 relative">
        <h1 className="text-3xl font-semibold mb-1">{displayName}</h1>
        <p className="text-purple-300 mb-4 text-sm italic">
          {response ? `"${response}"` : 'Waiting for question...'}
        </p>
        <button
          onClick={() => {
            localStorage.setItem('personaChatHistory', JSON.stringify(chatHistory.current))
            localStorage.setItem('personaName', displayName)
            window.location.href = `/quiz?name=${displayName}`
          }}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Quiz Me
        </button>
      </div>
    </div>
  )
}

export default PersonaChat
