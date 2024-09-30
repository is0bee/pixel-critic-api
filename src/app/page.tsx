import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-full">
      <h1 className="text-3xl font-bold">Bem vindo a pixel-critic-api</h1>
      <h2 className="text-xl font-medium">
        Navegue por uma das nossas rotas de api
      </h2>

      <Button>Primary</Button>
      <Button variant={"outline"}>Outline</Button>
    </div>
  );
}
