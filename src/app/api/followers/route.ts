import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

const followersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, followerId } = req.body; // userId é o usuário que está seguindo, followerId é o que está sendo seguido

    switch (req.method) {
        case 'GET':
            try {
                const { rows } = await sql`
                    SELECT * FROM followers WHERE following_id = ${userId}`;
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Erro ao procurar seguidores', error });
            }
            break;

        case 'POST':
            try {
                const { rows } = await sql`
                    INSERT INTO followers (follower_id, following_id)
                    VALUES (${followerId}, ${userId})
                    RETURNING *`;
                res.status(201).json(rows[0]);
            } catch (error) {
                res.status(400).json({ message: 'Erro ao seguir usuário', error });
            }
            break;

        case 'DELETE':
            try {
                const { rowCount } = await sql`
                    DELETE FROM followers
                    WHERE follower_id = ${followerId} AND following_id = ${userId}`;
                if (rowCount === 0) {
                    return res.status(404).json({ message: 'Não se seguem mutuamente' });
                }
                res.status(204).end();
            } catch (error) {
                res.status(400).json({ message: 'Erro ao deixar de seguir', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default followersHandler;
