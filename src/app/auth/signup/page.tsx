"use client";

import { FormEvent, useState } from "react";

import Logo from "@/assets/logo.png";

import { redirect } from "next/navigation";

// actions
import SignUp from "@/actions/signup";

// components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    setMessage(null);

    event.preventDefault();
    try {
      const data = await SignUp(username, email, password);

      if (data) {
        redirect("/auth/login");
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }

  function goToLogin() {
    redirect("/auth/login");
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
          <CardTitle className="text-base">Cadastrar usuário</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-3">
            {/* username */}
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* email */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
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

            {isLoading && <p>Carregando...</p>}
            {message && <p className="font-semibold text-red-300">{message}</p>}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button
              className="w-full sm:w-1/2"
              type="submit"
              disabled={!username || !email || !password ? true : false}
            >
              Cadastrar
            </Button>
            <Button
              className="w-full sm:w-1/2"
              variant={'ghost'}
              asChild
            >
              <Link
                href={'/auth/login'}
              >
                Já possuo uma conta
              </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
