// pages/profile.tsx
import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (session) {
        const response = await fetch('/api/get-user');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Erro ao buscar dados do usuário');
        }
      } else {
        console.error('Usuário não autenticado');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redireciona para a página inicial após o logout
  };

  if (loading) return <p>Carregando...</p>;
  if (!userData) return <p>Usuário não encontrado.</p>;

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>Nome: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Bio: {userData.bio}</p>
      <img 
        src={userData.avatar || 'https://z2gix0vclvtyixr7.public.blob.vercel-storage.com/Profile_avatar_placeholder_large-BCApkdnY21uaTXvHsALhgLtYikreKH.png'} 
        alt="Avatar" 
        style={{ width: '100px', height: '100px' }} 
      />
      <button onClick={() => router.push('/profile/edit')} style={styles.button}>
        Editar Perfil
      </button>
      <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#e63946', marginTop: '10px' }}>
        Sair
      </button>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default ProfilePage;
