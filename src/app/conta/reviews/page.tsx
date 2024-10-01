'use client'


import ReviewCard from "@/components/review-card"
import { AuthContext } from "@/context/auth-context"
import useReviews from "@/hooks/use-reviews"
import { useContext } from "react"


export default function ReviewsPage() {
  const { user } = useContext(AuthContext)
  const { reviews, isLoading, error } = useReviews(user?.id || 0)

  if (isLoading) return <p>Carregando reviews...</p>

  if (error) return <p className="font-semibold text-red-500">{JSON.stringify(error, null, 2)}</p>

  if (reviews) {
    return (
      <div className="grid items-center justify-center grid-cols-1 gap-6 py-5 size-full lg:grid-cols-2 auto-rows-auto">
        {reviews.map((review) => {
          return <ReviewCard key={review.id} review={review} />
        })}
      </div>
    )
  }
}
