'use client'

import { reviewsMockData } from "@/data/data"

import ReviewCard from "@/components/review-card"
import { AuthContext } from "@/context/auth-context"
import useReviews from "@/hooks/use-reviews"
import { useContext, useEffect } from "react"


export default function ReviewsPage() {
  const { user } = useContext(AuthContext)
  const { reviews, isLoading, error } = useReviews(user?.id || 0)

  useEffect(() => {
    console.log({ isLoading })
    console.log('data', { reviews })
    if (error) console.log(error)
  }, [error, isLoading, reviews])

  return (
    <div className="grid items-center justify-center grid-cols-1 gap-6 py-5 size-full lg:grid-cols-2 auto-rows-auto">
      {reviewsMockData.map((review, index) => {
        return <ReviewCard key={index} {...review} />
      })}
    </div>
  )
}
