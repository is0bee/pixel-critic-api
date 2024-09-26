import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const GamePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                const response = await fetch(`https://api.igdb.com/v4/games`, {
                    method: 'POST',
                    headers: {
                        'Client-ID': 'k54gtdpuey896plt6x13d5jfsvy5z5',
                        'Authorization': 'Bearer 7jzb0pecp35uyyikg07jpm1v09kz5h',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fields: '*',
                        where: `id = ${id}`
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setGame(data[0]);
                setLoading(false);
            };

            fetchGame().catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return <p>Carregando...</p>;

    if (!game) return <p>Jogo não encontrado.</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.cover?.url} alt={game.name} />
            <p>{game.summary}</p>
            <p>Plataformas: {game.platforms?.map(platform => platform.name).join(', ')}</p>
        </div>
    );
};

export default GamePage;
