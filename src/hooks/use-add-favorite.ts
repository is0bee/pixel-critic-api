import { AuthContext } from "@/context/auth-context";
import { useCallback, useContext, useState } from "react";

export default function useAddFavorite() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { token } = useContext(AuthContext)

  const addFavorite = useCallback(async (userId: number, gameId: number) => {
    setIsLoading(true)

    const headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        userId, gameId
      })
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data)
    }

    setIsLoading(false)

    return data
  }, [token])

  return { isLoading, error, addFavorite }
}