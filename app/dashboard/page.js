'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, PlayCircle } from 'lucide-react'

const Dashboard = () => {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleCreate = () => {
    if (!name.trim()) return
    const encodedName = encodeURIComponent(name.trim())
    router.push(`/persona/${encodedName}`)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-lg">
          PersonaGPT
        </span>
      </h1>

      {/* Search or Add Persona */}
      <div className="flex items-center gap-4 mb-10">
        <Input
          placeholder="Search or enter a historical figure..."
          className="flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="flex gap-2 cursor-pointer" onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Create
        </Button>
      </div>

      {/* Game Mode */}
      <div className="p-6 border border-dashed rounded-xl text-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        <h2 className="text-2xl font-semibold mb-2">🎮 Guess the Persona</h2>
        <p className="mb-4 text-muted-foreground">AI acts like a historical figure — can you guess who it is?</p>
        <Button className="text-lg px-6 py-2 flex gap-2 mx-auto cursor-pointer">
          <PlayCircle className="w-6 h-6" />
          Start Game
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
