// components
import { Input } from "@/components/ui/input";

// utils
import { cn } from "@/lib/utils";

// icons
import { Search } from "lucide-react";
import { ComponentProps } from "react";

export default function SearchInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <div className={cn('bg-neutral p-2 rounded h-10 flex items-center justify-start "hidden w-full col-span-1 md:flex"', className)}>
      <Search className="mr-2 text-black" />
      <Input
        type="text"
        placeholder="Digite sua pesquisa"
        className="p-0 text-black border-none outline-none focus:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-none bg-inherit"
        {...props}
      />
    </div>
  )
}
