'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import useFavorites from "@/hooks/use-favorites";

import Image from "next/image";
import { useContext } from "react";

export default function MyGamesPage() {
  const { user } = useContext(AuthContext)
  const { favorites, isLoading, error } = useFavorites(user?.id || 0)

  if (isLoading) return <p>Carregando favoritos...</p>

  if (error) return <p className="font-semibold text-red-500">{JSON.stringify(error, null, 2)}</p>

  if (favorites) {
    return (
      <div className="size-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_auto_auto] auto-grid-rows lg:grid-rows-2 items-center py-5 justify-center overflow-y-auto lg:justify-start gap-6">
        {favorites.map((favorite) => {
          return (
            <Card key={favorite.id}>
              <CardContent className="flex items-center justify-center p-2">
                <Image
                  width={200}
                  height={200}
                  className="h-[300px] object-cover w-full"
                  src={favorite.background_image}
                  alt=""
                />
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center gap-2">
                <span className="font-bold">{favorite.title}</span>
                <div className="flex flex-col items-center justify-center w-full space-y-2">
                  <Button variant={'outline'} className="text-red-500 border-red-500 hover:text-red-500">Remover dos favoritos</Button>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    )
  }
}
