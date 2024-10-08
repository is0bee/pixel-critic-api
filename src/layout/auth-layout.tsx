"use client";

import { ReactNode, useContext, useEffect } from "react";

import { AuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";


export default function AuthLayout({ children }: { children: ReactNode }) {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) redirect("/auth/login");
  }, [token]);

  return <div className="w-full h-screen">{children}</div>;
}
