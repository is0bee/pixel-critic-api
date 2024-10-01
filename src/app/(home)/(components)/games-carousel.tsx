
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// plugins
import Autoplay from "embla-carousel-autoplay"
import { Pencil, Star } from "lucide-react"
import Image from "next/image"

const mockdata = [
  {
    id: 1,
    img: "https://i.pinimg.com/originals/7c/30/f2/7c30f2099e6927569b8516921a25f0b2.jpg",
    name: "League of Legends"
  },
  {
    id: 2,
    img: "https://i.pinimg.com/originals/81/98/55/8198552e6b3d34a273b2ec581be41699.png",
    name: "FIFA"
  },
  {
    id: 3,
    img: "https://i.pinimg.com/736x/f8/c8/b0/f8c8b074cef02fc1a2808c6c997282e6.jpg",
    name: "PUBG"
  },
  {
    id: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAk96_VxdXOgiAhlZkNE9zfr3xoxJCNeqAwQ&s",
    name: "Call of Duty"
  },
  {
    id: 5,
    img: "https://i.pinimg.com/736x/43/51/66/435166d45c9abbc1b132090f1d33a425.jpg",
    name: "Valorant"
  },
  {
    id: 6,
    img: "https://i.pinimg.com/736x/8a/8b/50/8a8b50da2bc4afa933718061fe291520.jpg",
    name: "Dota"
  },
]

export default function GamesCarousel() {


  return (
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
        {mockdata.map((game) => (
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
                    src={game.img}
                    alt=""
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start justify-center gap-2">
                  <span className="font-bold">{game.name}</span>
                  <div className="flex flex-col items-center justify-center w-full space-y-2">
                    <Button variant={'outline'} className="w-full">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Favoritar
                    </Button>

                    <Button variant={'outline'} className="w-full">
                      <Pencil className="w-4 h-4 mr-2 text-emerald-500" />
                      Review
                    </Button>
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
