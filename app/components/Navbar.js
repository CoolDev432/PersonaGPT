'use client'

import React from 'react'
import Link from 'next/link'
import { UserButton, useUser, SignInButton, SignUpButton, SignIn } from '@clerk/nextjs'

const Navbar = () => {
  const { isSignedIn } = useUser()

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md fixed top-0 z-50">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        PersonaGPT
      </Link>

      <div className="flex gap-4 items-center">
        {isSignedIn ? (
          <>
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 font-medium hover:underline">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <>
            <SignInButton className={`cursor-pointer`}/>
            <SignUpButton className={`cursor-pointer`}/>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
