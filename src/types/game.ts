export type RAWG_Game = {
  id: number
  background_image: string
  name: string
  description: string
  released: string
  platforms: {
    platform: {
      name: string
    }
  }[]
}

export type Game = Omit<RAWG_Game, 'name'> & {
  title: string
}

export default Game