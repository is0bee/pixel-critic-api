'use client'

import FavoriteButton from "@/components/favorite-button"
import { ReviewDialog } from "@/components/review-dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AuthContext } from "@/context/auth-context"
import useGames from "@/hooks/use-games"

// plugins
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useContext } from "react"


export default function GamesCarousel() {
  const { games, error, isLoading } = useGames()
  const { user } = useContext(AuthContext)

  if (isLoading) return <p>Carregando jogos...</p>

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>

  if (games && user) return (
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
                    <FavoriteButton game_id={game.id} user_id={user?.id} title={game.title} />

                    <ReviewDialog game={game} />
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
