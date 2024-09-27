// pages/profile/edit-profile.tsx
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import type { PutBlobResult } from '@vercel/blob';

const EditProfile = () => {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/login'); // Redirecionar para a página de login se não estiver autenticado
        return;
      }

      setBio(session.user?.bio || '');
      setAvatarUrl(session.user?.avatar || 'https://z2gix0vclvtyixr7.public.blob.vercel-storage.com/Profile_avatar_placeholder_large-BCApkdnY21uaTXvHsALhgLtYikreKH.png');
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = await getSession(); // Verifique a sessão aqui
    if (!session) {
      alert('Você precisa estar logado para atualizar o perfil.');
      router.push('/auth/login');
      return;
    }

    let newAvatarUrl = avatarUrl;

    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];

      const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
      newAvatarUrl = newBlob.url;
    }

    const updateResponse = await fetch('/api/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio, avatar: newAvatarUrl }),
    });

    if (updateResponse.ok) {
      alert('Perfil atualizado com sucesso!');
      router.push('/profile');
    } else {
      const errorData = await updateResponse.json();
      console.error('Erro ao atualizar perfil:', errorData);
      alert('Falha ao atualizar perfil, tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Avatar</label>
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/*"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Atualizar</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </div>
  );
};

// Estilos
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '300px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EditProfile;
