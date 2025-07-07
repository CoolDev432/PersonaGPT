'use client'

import React from 'react'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import { Roboto } from 'next/font/google'
import { PersonStandingIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Link from 'next/link'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
}

const features = [
  {
    title: 'Conversational AI',
    description: 'Chat with historical personalities like you’re interviewing them in real life.',
  },
  {
    title: 'Quiz Mode',
    description: 'Test your knowledge with auto-generated quizzes based on your conversation.',
  },
  {
    title: 'Timeline & Quotes',
    description: 'Explore famous quotes and key milestones in each persona’s life.',
  },
  {
    title: 'Guess the Persona Game',
    description: 'Play a fun mystery game to identify personas based on clues.',
  },
]

const Page = () => {
  return (
    <div className={`${roboto.className} h-fit`}>
      <Navbar />

      <div className="pt-20">
        <HeroHighlight>
          <motion.div
            className="text-center px-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.div
              className="bg-black p-4 rounded-2xl w-fit mx-auto mb-7 shadow-xl animate-pulse"
              variants={fadeUp}
            >
              <PersonStandingIcon className="inline text-white scale-150 drop-shadow-glow" />
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-lg"
              variants={fadeUp}
            >
              PersonaGPT
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto font-medium"
              variants={fadeUp}
            >
              Understand Famous Personalities By Interviewing Them In a Fun And Conversational Way!
            </motion.p>

            {/* Profile Avatars */}
            <motion.div
              className="flex flex-wrap justify-evenly max-w-4xl mx-auto mt-12"
              variants={fadeUp}
            >
              <motion.img
                src="/newton.jpeg"
                alt="Newton"
                className="rounded-2xl hover:scale-110 transition-all mt-6 w-[120px] h-[120px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src="/archemedes.webp"
                alt="Archimedes"
                className="rounded-2xl hover:scale-110 transition-all mt-6 w-[120px] h-[120px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src="/einstein.webp"
                alt="Einstein"
                className="rounded-2xl hover:scale-110 transition-all mt-6 w-[120px] h-[120px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </HeroHighlight>

        {/* Features Section */}
        <section className="mt-24 px-6 max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-purple-300">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-[#1a1a1a] p-6 rounded-2xl border border-purple-700 shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 py-10 bg-[#0d0d0d] text-gray-400 border-t border-gray-700">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2025 PersonaGPT — All Rights Reserved</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-purple-400 transition">About</Link>
              <Link href="/privacy" className="hover:text-purple-400 transition">Privacy</Link>
              <Link href="/terms" className="hover:text-purple-400 transition">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Page
