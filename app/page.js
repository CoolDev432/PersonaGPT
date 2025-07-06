'use client'

import React from 'react'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import { Roboto } from 'next/font/google'
import { PersonStandingIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  })
}

const Page = () => {
  return (
    <div className={`${roboto.className} h-[300vh]`}>
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
                  staggerChildren: 0.15
                }
              }
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

            <motion.div
              className="flex w-[40vw] justify-evenly m-auto mt-4 flex-wrap"
              variants={fadeUp}
            >
              <motion.img
                src="/newton.jpeg"
                alt="Newton"
                className="rounded-2xl hover:scale-110 transition-all mt-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src="/archemedes.webp"
                alt="Archimedes"
                height={140}
                width={140}
                className="rounded-2xl hover:scale-110 transition-all mt-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src="/einstein.webp"
                alt="Einstein"
                height={140}
                width={160}
                className="rounded-2xl hover:scale-110 transition-all mt-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </HeroHighlight>
      </div>
    </div>
  )
}

export default Page
