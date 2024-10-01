import { gamesMockData } from "@/data/data";

import Image from "next/image";

export default function MyGamesPage() {
  return (
    <div className="size-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_auto_auto] auto-grid-rows lg:grid-rows-2 items-center py-5 justify-center overflow-y-auto lg:justify-start gap-6">
      {gamesMockData.map((game, index) => {
        return (
          <div
            key={index}
            className="relative flex items-center justify-center"
          >
            <Image
              width={500}
              height={500}
              className="w-[160px] h-[250px]"
              src={game.image}
              alt=""
            />

            <div className="absolute inset-0 flex items-end justify-center px-4 pb-8 text-transparent transition bg-transparent hover:bg-black/80 hover:text-white">
              <span className="text-base font-bold text-center">{game.name}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
