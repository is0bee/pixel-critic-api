'use client'

import { AuthContext } from "@/context/auth-context"
import { useContext } from "react"
import GamesCarousel from "./(components)/games-carousel"
import UnloggedContent from "./(components)/unlogged-content"

export default function HomePage() {
  const { token, user } = useContext(AuthContext)

  if (!token) return <UnloggedContent />

  return (
    <div className="flex flex-col items-center justify-center gap-4 size-full">
      <h1 className="text-3xl">Bem vindo(a), {user?.username ?? 'Usuário'}, o que vamos fazer hoje?</h1>

      {/* game news */}
      <div className="flex flex-col items-center justify-center w-full gap-2 sm:items-start">
        <span className="underline text-primary underline-offset-8">Novidades de hoje</span>

        {/* games grid */}
        <div className="flex items-center justify-center w-full">
          <GamesCarousel />
        </div>
      </div>
    </div>
  )
}