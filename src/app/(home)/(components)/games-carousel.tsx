'use client'

import ReviewButton from "@/components/review-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useGames from "@/hooks/use-games"
import Review from "@/types/review"

// plugins
import Autoplay from "embla-carousel-autoplay"
import { Star } from "lucide-react"
import Image from "next/image"


export default function GamesCarousel() {
  const { games, error, isLoading } = useGames()

  const mockReview: Review = {
    content: "Jogo pika",
    rating: 5
  }

  if (isLoading) return <p>Carregando jogos...</p>

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>

  if (games) return (
    <Carousel
      opts={{
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-2/3 md:w-full"
    >
      <CarouselContent className="flex items-center justify-center">
        {games.map((game) => (
          <CarouselItem
            key={game.id}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-2">
                  <Image
                    width={200}
                    height={200}
                    className="h-[250px] object-cover w-full"
                    src={game.background_image}
                    alt=""
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center gap-2">
                  <span className="font-bold">{game.title}</span>
                  <div className="flex flex-col items-center justify-center w-full space-y-2">
                    <Button variant={'outline'} className="w-full">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Favoritar
                    </Button>

                    <ReviewButton game={game} review={mockReview} />
                  </div>
                </CardFooter>
              </Card>
            </div>

          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
