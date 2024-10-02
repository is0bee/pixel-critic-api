import Game from "@/types/game";
import { useEffect, useState } from "react";


export default function useFavorites(user_id: number) {
  const [favorites, setFavorites] = useState<Game[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const queryParams = new URLSearchParams({ user_id: user_id.toString() })
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites?` + queryParams, {
        method: 'GET',
        next: {
          revalidate: 60,
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data)
      }

      setIsLoading(false)

      return data
    }

    fetchData()
      .then((data) => {
        setFavorites(data)
      })
      .catch((e) => setError(e))
  }, [user_id])

  return { favorites, error, isLoading }
}