import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  route: string
  children: ReactNode
}

export default function TabButton({ route, children }: Props) {
  const pathname = usePathname()

  return (
    <Button
      data-isrouteactive={pathname === route ? true : false}
      className="text-white text-base data-[isrouteactive=true]:underline decoration-primary transition"
      variant={'link'}
      asChild
    >
      <Link href={route}>
        {children}
      </Link>
    </Button>
  )
}
