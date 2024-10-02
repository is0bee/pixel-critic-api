'use client'

import { Mail, User } from "lucide-react";


import { Separator } from '@/components/ui/separator';
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export default function ProfilePage() {
  const { user } = useContext(AuthContext)

  return (
    <div className='flex flex-col items-start justify-center min-w-full min-h-full gap-4'>
      {/* page content */}
      <div className="flex flex-col items-start justify-center gap-6 my-4 size-full">
        {/* email */}
        <div className="flex flex-col items-start justify-center gap-2">
          <span className="flex items-center justify-center text-lg">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </span>
          <span className="p-3 rounded-lg bg-accent/30">{user?.email}</span>
        </div>

        {/* usuario */}
        <div className="flex flex-col items-start justify-center gap-2">
          <span className="flex items-center justify-center text-lg">
            <User className="w-4 h-4 mr-2" />
            Nome de usuário
          </span>
          <span className="p-3 rounded-lg bg-accent/30">{user?.username}</span>
        </div>
      </div>
      <Separator />

    </div>
  )
}
