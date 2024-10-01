'use client'

import { useState } from "react"

import { useRouter } from "next/navigation"

// components

// assets
import Logo from "@/assets/logo.png"
import SearchInput from "./search-input"

// icons
import { AuthContext } from "@/context/auth-context"
import { CircleUserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

export default function Header() {
  const [searchText, setSearchText] = useState('')

  const { token, user } = useContext(AuthContext)

  const { replace } = useRouter()

  function goToLogin() {
    replace('/auth/login')
  }

  function goToProfile() {
    replace('/conta/perfil')
  }

  return (
    <header className="grid col-span-1 row-span-1 place-items-center">
      <div className="grid w-full h-20 grid-cols-2 grid-rows-1 bg-black place-items-center md:grid-cols-3">
        {/* logo */}
        <div className="grid col-span-1 place-items-center">
          <Image className="w-2/3 md:w-1/2" src={Logo} alt="Logo" />
        </div>

        {/* pesquisa */}
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* buttons container */}
        <div className="flex items-center justify-center col-span-1 row-span-1 gap-4">

          {/* unlogged content */}
          {!token && <Link
            href={'/auth/login'}
          >
            <CircleUserRound className="w-5 h-5 mr-2" />
            Login
          </Link>
          }

          {/* logged content */}
          {token && <div
            onClick={goToProfile}
            className="flex items-center justify-center gap-2 cursor-pointer"
            title="Perfil"
          >
            <span>{user?.username ?? 'Usuário'}</span>
            <CircleUserRound className="w-10 h-10" />
          </div>
          }
        </div>
      </div>

      {/* responsive input */}
      <div className="grid w-full pb-4 bg-black place-items-center md:hidden">
        <SearchInput className="w-2/3" />
      </div>
    </header>
  )
}
