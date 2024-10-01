import { useCallback, useState } from "react";

import Game from "@/types/game";
import Review from "@/types/review";

export default function useSendReview(game: Game, review: Review) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown | null>(null)

  const sendReview = useCallback(async () => {
    setIsLoading(true)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ game, review })
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data)
    }

    setIsLoading(false)

    return data
  }, [game, review])

  return { isLoading, error, sendReview }
}