import { UserReview } from "@/types/review";
import { useEffect, useState } from "react";

export default function useReviews(userID: number) {
  const [reviews, setReviews] = useState<UserReview[]>()
  const [error, setError] = useState<unknown | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const queryParams = new URLSearchParams({ user_id: userID.toString() })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?` + queryParams, {
        method: 'GET',
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
        setReviews(data)
        console.log(data)
      })
      .catch(e => {
        setError(e)
        console.error(e)
      })
  }, [userID])

  return { reviews, isLoading, error }
}