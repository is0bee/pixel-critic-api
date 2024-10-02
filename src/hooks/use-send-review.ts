import { useCallback, useState } from "react";

import Game from "@/types/game";
import { Review } from "@/types/review";

export default function useSendReview() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const sendReview = useCallback(async (game: Game, review: Review, token: string) => {
    setIsLoading(true)

    // modifying data
    const modifiedGame: Omit<Game, 'id'> = { ...game }
    const modifiedReview = {
      ...review,
      game_id: game.id
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ game: modifiedGame, review: modifiedReview, background_image: game.background_image })
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data)
    }

    setIsLoading(false)

    return data
  }, [])

  return { isLoading, error, sendReview }
}