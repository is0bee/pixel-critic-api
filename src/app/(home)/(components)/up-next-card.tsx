import { PlayCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type Props = {
  brandImage: StaticImageData;
  brandAlt: string;
  title: string;
  subtitle: string;
  youtubeLink: string;
  videoDuration: string;
};

export default function UpNextCard({
  brandImage,
  brandAlt,
  title,
  subtitle,
  youtubeLink,
  videoDuration
}: Props) {
  return (
    <div className="flex items-center justify-start col-span-1 row-span-1 gap-2 p-2 transition hover:bg-accent/30 backdrop-blur-sm">
      {/* brand img */}
      <div className="w-24 h-32">
        <Image className="object-cover w-full max-h-full" src={brandImage} alt={brandAlt} />
      </div>

      <div className="flex flex-col items-start justify-start w-full h-full py-1">
        {/* duration */}
        <div className="flex items-center justify-start w-full gap-2">
          <PlayCircle className="w-8 h-8" />
          <span>{videoDuration}</span>
        </div>

        {/* title */}
        <h1 className="my-1 text-lg">{title}</h1>
        <h3 className="text-sm">{subtitle}</h3>
      </div>
    </div>
  )
}
