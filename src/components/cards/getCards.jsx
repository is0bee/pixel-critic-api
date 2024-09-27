'use client';
import React, { useEffect, useState } from 'react';
import Cards from './Cards';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=0179ef5a00f54f35be69b138abf3ea30`);
        const data = await response.json();
        setGames(data.results.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="game-list">
      {games.map((game) => (
        <Cards
          key={game.id}
          title={game.name}
          description={new Date(game.released).getFullYear()}
          image={game.background_image}
        />
      ))}
    </div>
  );
};

export default GameList;
