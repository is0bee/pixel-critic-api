import { ChevronRight } from "lucide-react";

import { trailerData } from "@/data/data";
import UpNextCard from "./up-next-card";

export default function UnloggedContent() {
  const trailerLink = 'https://www.youtube.com/embed/ZHhqwBwmRkI?si=unyIb5OlMoxEV9tv'
  const trailerTitle = 'Still Here | Animação da Temporada 2024 – League of Legends'

  return (
    <div className="grid justify-center min-w-full min-h-full grid-cols-3 gap-2 auto-rows-fr">
      {/* image container */}
      <div className="grid col-span-3 row-span-3 lg:row-span-5 lg:col-span-2">
        <iframe
          className="size-full"
          src={trailerLink}
          title={trailerTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* up next trailers */}
      <div className="grid col-span-3 row-span-5 grid-cols-subgrid lg:col-span-1">
        <h1 className="col-span-3 px-2 mb-3 font-semibold lg:col-span-1 text-primary">Up next</h1>
        {/* trailer cards */}
        <div className="grid col-span-3 grid-rows-3 lg:col-span-1 lg:grid-cols-1">
          {trailerData.map((card, index) => (
            <UpNextCard key={index} {...card} />
          ))}
        </div>

        <a href="" className="flex items-center justify-start col-span-3 row-span-1 mt-4 ml-4 text-sm transition lg:col-span-1 hover:text-primary">
          Browse trailers
          <ChevronRight className="w-4 ml-2" />
        </a>
      </div>
    </div>
  )
}
