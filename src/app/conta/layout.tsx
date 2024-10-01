'use client'

import { ReactNode, useContext } from "react";

import { CircleUser, Home, LogOut } from "lucide-react";

import { AuthContext } from "@/context/auth-context";


import TabButton from "@/components/tab-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/layout/auth-layout";
import Link from "next/link";

export default function AccountPageLayout({ children }: { children: ReactNode }) {

  const { logout, user } = useContext(AuthContext)


  return (
    <AuthLayout>
      <div className="flex flex-col items-center min-w-full min-h-screen gap-2 px-6 mt-4 sm:px-screen sm:mt-20">
        <header className="flex items-center justify-start w-full gap-3">
          <CircleUser className="w-8 h-8" />
          <span className="text-xl">{user?.username}</span>
        </header>

        {/* tabs */}
        <div className="flex flex-col items-center justify-between w-full mt-4 lg:flex-row">
          <nav className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <TabButton route={'/conta/perfil'}>
              Perfil
            </TabButton>
            <TabButton route={'/conta/meus-jogos'}>
              Meus Jogos
            </TabButton>
            <TabButton route={'/conta/reviews'}>
              Reviews
            </TabButton>
            <TabButton route={'/conta/amigos'}>
              Amigos
            </TabButton>
          </nav>

          <div className="flex flex-wrap items-center gap-4 my-4 lg:ml-auto justiy-center lg:my-0">
            {/* logout */}
            <Button
              variant={'outline'}
              className="hover:bg-primary hover:text-primary-foreground"
              onClick={logout}
              asChild
            >
              <Link href={'/auth/login'}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </Button>

            {/* ir para home */}
            <Button
              variant={'outline'}
              className="hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href={'/'}>
                <Home className="w-4 h-4 mr-2" />
                Ir para o início
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        {/* componente da rota */}
        {children}
      </div>
    </AuthLayout>
  )
}
