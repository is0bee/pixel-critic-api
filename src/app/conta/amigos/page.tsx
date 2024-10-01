import FriendCard from "@/components/friend-card"
import { friendsMockData } from "@/data/data"

export default function FriendsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 py-5 size-full md:w-2/3 lg:w-full lg:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
      {friendsMockData.map((friend, index) => {
        return <FriendCard key={index} {...friend} />
      })}
    </div>
  )
}
