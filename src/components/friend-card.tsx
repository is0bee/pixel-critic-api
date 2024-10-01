import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  image: string
  user: string
}

export default function FriendCard({ image, user }: Props) {
  return (
    <div className='flex items-center justify-start p-4 bg-neutral/50'>
      {/* avatar */}
      <div className="w-16 h-16 overflow-hidden rounded-full">
        <Image width={500} height={500} className="object-cover object-top w-full h-full" src={image} alt="" />
      </div>

      <div className="flex items-start justify-center h-full px-2">
        <h1 className="font-semibold">{user}</h1>
      </div>

      <div className="flex items-end justify-center h-full ml-auto">
        <Button className="px-2 py-0">
          Desfazer amizade
        </Button>
      </div>
    </div>
  )
}
