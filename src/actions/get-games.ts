import Game, { RAWG_Game } from "@/types/game"

const API_KEY = "0179ef5a00f54f35be69b138abf3ea30"



export default async function getGames(): Promise<Game[]> {
  const queryParams = new URLSearchParams({ key: `${API_KEY}` })
  const response = await fetch(`${process.env.NEXT_PUBLIC_GAMES_API_URL}/games?` + queryParams, {
    method: 'GET'
  })

  const data = await response.json()
    .then((data) => data.results)
    // transforming data
    .then(data => data.map((item: RAWG_Game) => {
      const { id, name, background_image, description, released, platforms } = item
      return {
        id,
        background_image,
        title: name,
        description: description || '',
        release_date: released || null,
        platform: platforms.map(p => p.platform.name).join(',')
      }
    }))

  if (!response.ok) {
    throw new Error("Ocorreu um erro ao listar os jogos")
  }

  return data
}