import { Star } from "lucide-react"
import Image from "next/image"

type Props = {
  image: string
  game: string
  rating: number
  comment: string
}

export default function ReviewCard({ image, game, rating, comment }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 border-b sm:border-b-0 sm:flex-row sm:items-start sm:justify-start">
      <Image
        width={200}
        height={130}
        className="w-[130px] h-[200px] sm:w-[160px] sm:h-[230px] object-cover"
        src={image}
        alt=""
      />

      {/* card info */}
      <div className="flex flex-col items-center justify-center gap-4 py-5 size-full sm:items-start sm:justify-start">
        <h1 className="text-2xl font-bold">{game}</h1>
        <div className="flex items-start gap-2 jusitfy-center">
          {Array.from({ length: rating }).map((_, index) => {
            return <Star fill="#facc15" key={index} className="w-6 h-6 text-yellow-400" />
          })}
        </div>
        <p className="text-base text-center sm:text-start">&quot;{comment}&quot;</p>
      </div>
    </div>
  )
}
