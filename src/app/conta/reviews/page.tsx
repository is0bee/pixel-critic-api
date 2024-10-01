import { reviewsMockData } from "@/data/data"

import ReviewCard from "@/components/review-card"


export default function ReviewsPage() {
  return (
    <div className="grid items-center justify-center grid-cols-1 gap-6 py-5 size-full lg:grid-cols-2 auto-rows-auto">
      {reviewsMockData.map((review, index) => {
        return <ReviewCard key={index} {...review} />
      })}
    </div>
  )
}
