import Image from "next/image"

import Game from "@/types/game"
import User from "@/types/user"

import { Loader2, Trash2 } from "lucide-react"


import useRemoveFavorite from "@/hooks/use-remove-favorite"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"

type Props = {
  favorite: Game
  user: User
}

export default function FavoriteCard({ favorite, user }: Props) {
  const { removeFavorite, isLoading } = useRemoveFavorite()

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
          <Button
            variant={'outline'}
            className="text-red-500 border-red-500 hover:text-red-500"
            disabled={isLoading}
            onClick={() => removeFavorite(user?.id, favorite.id)}
          >
            {!isLoading && <Trash2 className="w-4 h-4 mr-2" />}
            {isLoading && <Loader2 className="w-4 h-4 mr-2" />}
            Remover dos favoritos
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}