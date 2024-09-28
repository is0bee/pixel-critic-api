import React, { useState } from "react";
import Modal from 'react-modal';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from "./header.module.css";

Modal.setAppElement('#__next');

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const fetchGames = async () => {
    if (searchTerm) {
      const response = await fetch(`https://api.rawg.io/api/games?key=0179ef5a00f54f35be69b138abf3ea30&search=${searchTerm}`);
      const data = await response.json();
      setGames(data.results);
    } else {
      setGames([]);
    }
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const handleImageClick = (id) => {
    router.push(`/games/${id}`);
  };

  const handleSaveReview = async () => {
    if (selectedGame) {
      const gameData = {
        title: selectedGame.name,
        description: selectedGame.description || '',
        release_date: selectedGame.released || null,
        platform: selectedGame.platforms.map(p => p.platform.name).join(', '),
      };

      const reviewData = {
        user_id: 'USER_ID', // Replace with actual user ID
        content: review,
        rating: rating,
        game_id: selectedGame.id,
      };

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: gameData,
          review: reviewData,
        }),
      });

      if (response.ok) {
        console.log("Review and game saved successfully!");
        setIsGameModalOpen(false);
        setReview('');
        setRating(0);
        setSelectedGame(null);
      } else {
        console.error("Failed to save the review and game");
      }
    }
  };

  return (
    <header className={styles.header}>
      <h1>Pixel Critic</h1>
      <ul>
        <li>
          <button onClick={() => setIsModalOpen(true)}>LOG +</button>
        </li>
        <li>
          <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#e63946', marginTop: '10px' }}>
            Sair
          </button>
        </li>
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Procurar jogo"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <h2>Procurar jogo</h2>
        <input
          type="text"
          placeholder="Digite o nome do jogo..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            fetchGames();
          }}
        />
        <ul>
          {games.map((game) => (
            <li key={game.id} onClick={() => handleGameClick(game)}>
              {game.name}
            </li>
          ))}
        </ul>
        <button onClick={() => setIsModalOpen(false)}>X</button>
      </Modal>

      {selectedGame && (
        <Modal
          isOpen={isGameModalOpen}
          onRequestClose={() => setIsGameModalOpen(false)}
          contentLabel="Game Details"
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          <h2>{selectedGame.name}</h2>
          {selectedGame.background_image && (
            <img 
              src={selectedGame.background_image} 
              alt={selectedGame.name} 
              style={{ width: '100%', cursor: 'pointer' }} 
              onClick={() => handleImageClick(selectedGame.id)} 
            />
          )}
          <p>Ano: {selectedGame.released.split('-')[0]}</p>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Escreva sua avaliação..."
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <div>
            <label>Avaliação: </label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[0, 1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{star}</option>
              ))}
            </select>
          </div>
          <button onClick={handleSaveReview}>Salvar</button>
          <button onClick={() => setIsGameModalOpen(false)}>Fechar</button>
        </Modal>
      )}
    </header>
  );
};

export default Header;
