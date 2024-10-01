import Game from "@/types/game";
import Review from "@/types/review";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  game: Game
  review: Review
}

export default function ReviewButton({ game, review }: Props) {

  function handleReview() {
    console.log({ game, review })
  }

  return (
    <Button
      variant={'outline'}
      className="w-full"
      onClick={handleReview}
    >
      <Pencil className="w-4 h-4 mr-2 text-emerald-500" />
      Review
    </Button>
  )
}