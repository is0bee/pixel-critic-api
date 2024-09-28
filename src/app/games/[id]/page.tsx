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
                const response = await fetch(`https://api.rawg.io/api/games/${id}?key=0179ef5a00f54f35be69b138abf3ea30`, {
                    method: 'GET',
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setGame(data);
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
            <p>Data de Lançamento: {game.released}</p>
            <p>Plataformas: {game.platforms?.map(platform => platform.platform.name).join(', ')}</p>
            {game.background_image && (
                <img src={game.background_image} alt={game.name} />
            )}
        </div>
    );
};

export default GamePage;
