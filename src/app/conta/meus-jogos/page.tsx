'use client'

import FavoriteCard from "@/components/favorite-card";
import { AuthContext } from "@/context/auth-context";
import useFavorites from "@/hooks/use-favorites";
import { useContext } from "react";


export default function MyGamesPage() {
  const { user } = useContext(AuthContext)
  const { favorites, isLoading, error } = useFavorites(user?.id || 0)

  if (isLoading) return <p>Carregando favoritos...</p>

  if (error) return <p className="font-semibold text-red-500">{JSON.stringify(error, null, 2)}</p>

  if (!favorites) <p>Sem favoritos adicionados</p>

  if (favorites && user) {
    return (
      <div className="size-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_auto_auto] auto-grid-rows lg:grid-rows-2 items-center py-5 justify-center overflow-y-auto lg:justify-start gap-6">
        {favorites.map((favorite) => {
          return <FavoriteCard key={favorite.id} favorite={favorite} user={user} />
        })}
      </div>
    )
  }
}
