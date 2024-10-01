
const API_KEY = "0179ef5a00f54f35be69b138abf3ea30"

type ItemsProps = {
  name: string
  description: string
  released: string
  platforms: {
    platform: {
      name: string
    }
  }[]

}

export default async function getGames() {
  const queryParams = new URLSearchParams({ key: `${API_KEY}` })
  const response = await fetch(`${process.env.NEXT_PUBLIC_GAMES_API_URL}/games?` + queryParams, {
    method: 'GET'
  })

  const data = await response.json()
    .then((data) => data.results)
    // transforming data
    .then(data => data.map((item: ItemsProps) => {
      const { name, description, released, platforms } = item
      return {
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