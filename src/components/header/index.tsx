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
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

export default function Header() {
  const [searchText, setSearchText] = useState('')

  const { token, user } = useContext(AuthContext)

  const { replace } = useRouter()

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
            className="flex items-center justify-center h-full gap-3"
            title="Perfil"
          >
            <span className="text-xl font-semibold capitalize">{user?.username ?? 'Usuário'}</span>
            <Separator orientation="vertical" className="w-px h-10" />
            <Button variant={'outline'} asChild>
              <Link href={'/conta/perfil'}>
                <CircleUserRound className="w-6 h-6 mr-2" />
                Meu perfil
              </Link>
            </Button>
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
