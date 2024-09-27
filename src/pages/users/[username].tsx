// pages/users/[username].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const UserPage = () => {
    const router = useRouter();
    const { username } = router.query; // Get the username from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionUser, setSessionUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSessionUser(session?.user); // Set the authenticated user
        };

        fetchSession();
    }, []);

    useEffect(() => {
        if (username) {
            const fetchUsers = async () => {
                const response = await fetch(`http://localhost:3000/api/users`); // Fetch all users

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const filteredUser = data.find((user) => user.username === username); // Filter to find the specific user
                setUser(filteredUser || null); // Set user or null if not found

                // Check if the logged-in user is already following this user
                if (filteredUser && sessionUser) {
                    const followingResponse = await fetch(`http://localhost:3000/api/followers`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: filteredUser.id, followerId: sessionUser.id }),
                    });

                    if (followingResponse.ok) {
                        const followingData = await followingResponse.json();
                        setIsFollowing(followingData.length > 0); // Set following status
                    }
                }
                setLoading(false);
            };

            fetchUsers().catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
        }
    }, [username, sessionUser]);

    const handleFollow = async () => {
        if (sessionUser) {
            const response = await fetch(`http://localhost:3000/api/followers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followerId: sessionUser.id,
                    userId: user.id,
                }),
            });

            if (response.ok) {
                setIsFollowing(true); // Update following status
                alert('Você começou a seguir este usuário!');
            } else {
                console.error('Erro ao seguir o usuário');
            }
        }
    };

    const handleUnfollow = async () => {
        if (sessionUser) {
            const response = await fetch(`http://localhost:3000/api/followers`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followerId: sessionUser.id,
                    userId: user.id,
                }),
            });

            if (response.ok) {
                setIsFollowing(false); // Update following status
                alert('Você deixou de seguir este usuário.');
            } else {
                console.error('Erro ao deixar de seguir o usuário');
            }
        }
    };

    if (loading) return <p>Carregando...</p>;

    if (!user) return <p>Usuário não encontrado.</p>;

    const isCurrentUser = sessionUser?.username === username; // Check if the logged-in user is the same as the user being viewed

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            {user.avatar && <img src={user.avatar} alt={user.username} />}
            {!isCurrentUser && (
                <button onClick={isFollowing ? handleUnfollow : handleFollow}>
                    {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
                </button>
            )}
        </div>
    );
};

export default UserPage;
