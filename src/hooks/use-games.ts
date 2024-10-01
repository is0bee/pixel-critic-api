import getGames from "@/actions/get-games";
import Game from "@/types/game";
import { useEffect, useState } from "react";

export default function useGames() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        const data = await getGames()
        setGames(data)
      } catch (e) {
        setError(e)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return { games, error, isLoading }
}