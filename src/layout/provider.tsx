"use client";

import { AuthProvider } from "@/context/auth-context";
import { ReactNode } from "react";

export default function ProviderLayout({ children }: { children: ReactNode }) {

  return <AuthProvider>{children}</AuthProvider>;
}
