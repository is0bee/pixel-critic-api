'use client'

import { AuthContext } from "@/context/auth-context"
import { useContext } from "react"
import UnloggedContent from "./(components)/unlogged-content"

export default function HomePage() {
  const { token } = useContext(AuthContext)

  if (!token) return <UnloggedContent />

  return (
    <div>HomePage</div>
  )
}