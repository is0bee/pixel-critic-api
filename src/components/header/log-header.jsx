import React, { useState } from "react";
import Modal from 'react-modal';
import { signOut } from 'next-auth/react';
import styles from "./header.module.css";

// Set the app element for accessibility
Modal.setAppElement('#__next'); // Ensure this matches your root element

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
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

      {/* Modal for searching games */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Search for a Game"
        className={styles.modalContent} // Custom class for modal content
        overlayClassName={styles.modalOverlay} // Custom class for modal overlay
      >
        <h2>Search for a Game</h2>
        <input type="text" placeholder="Enter game name..." />
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </header>
  );
};

export default Header;
