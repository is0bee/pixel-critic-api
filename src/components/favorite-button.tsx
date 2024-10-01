import useAddFavorite from "@/hooks/use-add-favorite";
import useFavorites from "@/hooks/use-favorites";
import { Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  game_id: number
  user_id: number
  title: string
}

export default function FavoriteButton({ game_id, user_id, title }: Props) {
  const { addFavorite, isLoading, error } = useAddFavorite()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const { favorites } = useFavorites(user_id)

  useEffect(() => {

    const findFavorite = favorites?.find((favorite) => favorite.title === title)

    if (findFavorite) setIsFavorite(true)
  }, [favorites, title, user_id])

  function handleFavorite() {
    addFavorite(user_id, game_id)
  }

  return (
    <Button
      variant={'outline'}
      className="w-full"
      disabled={isLoading}
      onClick={handleFavorite}
    >
      {!isLoading && <Star data-isfavorite={isFavorite} className="w-4 h-4 mr-2 data-[isfavorite=true]:bg-yellow-500 text-yellow-500" />}
      {isLoading && <Loader2 className="w-4 h-4 mr-2" />}
      {isFavorite ? <span>Favoritado</span> : <span>Favoritar</span>}
    </Button>
  )
}