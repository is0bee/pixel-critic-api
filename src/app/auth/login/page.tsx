"use client";

import { useContext, useState } from "react";

import { redirect } from "next/navigation";

import Logo from "@/assets/logo.png";

import Image from "next/image";

// actions
import Login from "@/actions/login";

// components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// context
import { AuthContext } from "@/context/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [IsLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState<string | null>("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(event: any) {
    setError(null);

    setIsLoading(true);

    event.preventDefault();
    try {
      const { user, token } = await Login(email, password);

      if (token && user) {
        login(token, user);

        redirect("/");
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }

  function goToRegistry() {
    redirect("/auth/registrar");
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      {/* form card */}
      <Card className="w-[90%] sm:w-[600px] bg-neutral">
        <CardHeader className="flex flex-col items-center justify-center gap-2">
          {/* logo */}
          <Image
            className="w-3/4 sm:w-1/3 sm:self-start"
            width={500}
            height={500}
            src={Logo}
            alt="Pixel Critic logo"
          />

          {/* title */}
          <CardTitle className="text-base">Entrar na sua conta</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-3">
            {/* Email */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* password */}
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar-se de mim
                </Label>
              </div>

              <a className="transition cursor-pointer hover:text-primary">
                Esqueceu a senha?
              </a>
            </div>

            {IsLoading && <p>Carregando...</p>}
            {Error && <p className="font-medium text-red-300">{Error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col justify-between mt-6 sm:flex-row">
            <Button
              className="w-full sm:w-1/2"
              type="submit"
              disabled={!email || !password || IsLoading ? true : false}
            >
              Entrar
            </Button>
            <div className="flex items-center justify-center w-full sm:w-1/2">
              <a
                onClick={goToRegistry}
                className="transition cursor-pointer hover:text-primary"
              >
                Não tem conta?
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
