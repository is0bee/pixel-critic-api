// components
import Image from "next/image";
import { Separator } from "./ui/separator";

// assets
import IFCEImg from "@/assets/footer/ifce.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-between col-span-1 gap-4 px-6 py-5 md:gap-0 md:py-20 md:flex-row bg-neutral md:px-screen text-primary-foreground">
      {/* about us */}
      <div className="flex flex-col gap-2 basis-2/5">
        <h1 className="text-lg font-bold">Sobre nós</h1>
        <p className="text-sm">O Pixel Critic tem como objetivo centralizar informações relevantes sobre eventos esportivos e competições de eSports em uma única plataforma. Oferecemos uma experiência completa e envolvente com avaliações, análises, listas de favoritos e interações sociais. Descubra novos eventos, acompanhe seus favoritos e participe de discussões sobre o mundo dos esportes e eSports com uma interface amigável e acessível.</p>
      </div>

      {/* links */}
      <div className="flex flex-col items-center justify-center gap-2 basis-1/5">
        <h1 className="text-lg font-bold text-primary-foreground">Links úteis</h1>
        <nav className="flex flex-col items-center justify-center">
          <Link className="transition hover:text-primary" href="/">Início</Link>
          <Link className="transition hover:text-primary" href="/conta/perfil">Perfil</Link>
          <Link className="transition hover:text-primary" href="/conta/meus-jogos">Meus Jogos</Link>
          <Link className="transition hover:text-primary" href="/conta/reviews">Reviews</Link>
          <Link className="transition hover:text-primary" href="/conta/amigos">Amigos</Link>
        </nav>
      </div>

      <div className="flex items-center justify-center h-full basis-1/5">
        <Separator orientation="vertical" />
      </div>

      {/* logo */}
      <div className="flex flex-col items-center justify-center gap-4 md:basis-1/5">
        <Image src={IFCEImg} className="w-2/4 md:w-full" alt="IFCE Logo" />
        <span className="text-sm">© 2024 Pixel Critic. Todos os direitos reservados.</span>
      </div>
    </div>
  )
}
