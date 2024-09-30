"use client";

import { ReactNode, useContext } from "react";

import { AuthContext, AuthProvider } from "@/context/auth-context";
import { useEffect } from "react";

import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) redirect("/auth/login");
  }, [token]);

  return <div className="w-full h-screen">{children}</div>;
}
