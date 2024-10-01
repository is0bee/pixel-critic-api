'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Game from "@/types/game"

import { AuthContext } from "@/context/auth-context"
import useSendReview from "@/hooks/use-send-review"
import { Loader2, Pencil, Send } from "lucide-react"
import { useContext, useState } from "react"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"

type Props = {
  game: Game
}

export function ReviewDialog({ game }: Props) {
  const [comment, setComment] = useState<string>("")
  const [rating, setRating] = useState<number>(1)
  const [message, setMessage] = useState<string>("")

  const { token } = useContext(AuthContext)
  const { sendReview, isLoading, error } = useSendReview()


  async function handleSubmit(e: any) {
    e.preventDefault();
    const review = {
      content: comment,
      rating
    }

    try {
      const data = await sendReview(game, review, token)
      setMessage('Review adicionado com sucesso')
    } catch (e) {
      console.error(error)
      setMessage(JSON.stringify(error, null, 2))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="w-full"
        >
          <Pencil className="w-4 h-4 mr-2 text-emerald-500" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby=""
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Envie uma análise</DialogTitle>
          </DialogHeader>
          <Separator orientation="horizontal" className="mt-2" />
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="flex flex-col items-start justify-center col-span-3 gap-4">
              <Label htmlFor="comment" className="text-right">
                Comentário
              </Label>
              <Textarea
                id="comment"
                className="col-span-3"
                placeholder="Melhor do que passar de semestre"
                disabled={isLoading}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start justify-center col-span-2 gap-4">
              <Label htmlFor="rating" className="text-right">
                Nota
              </Label>
              <Input
                id="rating"
                type="number"
                className="w-1/2"
                disabled={isLoading}
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(+e.target.value)}
              />
            </div>
          </div>
          {error && message && <p className="my-4 font-semibold text-red-400">{JSON.stringify(error, null, 2)}</p>}

          {message && !error && <p className="my-4 font-semibold text-emerald-500">{message}</p>}
          <DialogFooter className="flex flex-col items-center justify-center sm:justify-between sm:flex-row">
            <DialogClose className="px-4 py-2 transition border rounded border-border bg-background hover:bg-neutral hover:border-neutral hover:text-neutral-foreground">
              Cancelar
            </DialogClose>
            <Button type="submit" disabled={isLoading || !comment || !rating}>
              {!isLoading && <Send className="w-4 h-4 mr-2" />}
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enviar análise
            </Button>
          </DialogFooter>
        </ form>
      </DialogContent>
    </Dialog>
  )
}
