import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { getSession } from 'next-auth/react';

const reviewsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            const { game_id } = req.query;
            try {
                const { rows } = await sql`
                    SELECT * FROM Reviews WHERE game_id = ${game_id}`;
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'erro ao buscar reviews', error });
            }
            break;

        case 'POST':
            const session = await getSession({ req }); // Get the session
            const user_id = session?.user?.id; // Extract user ID from the session

            if (!user_id) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            const { game, review } = req.body;
            const { content, rating, game_id: reviewGameId } = review;
      
            try {
                const gameInsert = await sql`
                    INSERT INTO games (title, description, release_date, platform)
                    VALUES (${game.title}, ${game.description}, ${game.release_date}, ${game.platform})
                    ON CONFLICT (id) DO NOTHING
                    RETURNING id`;
                
                const insertedGameId = gameInsert.rows[0]?.id || reviewGameId;

                const reviewInsert = await sql`
                    INSERT INTO Reviews (user_id, content, rating, game_id)
                    VALUES (${user_id}, ${content}, ${rating}, ${insertedGameId})
                    RETURNING *`;
                
                res.status(201).json(reviewInsert.rows[0]);
            } catch (error) {
                res.status(400).json({ message: 'erro ao criar review', error });
            }
            break;

        case 'DELETE':
            const { reviewId } = req.body;

            try {
                const { rowCount } = await sql`
                    DELETE FROM Reviews WHERE id = ${reviewId}`;
                if (rowCount === 0) {
                    return res.status(404).json({ message: 'review nao encontrada' });
                }
                res.status(204).end();
            } catch (error) {
                res.status(400).json({ message: 'erro ao deletar review', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default reviewsHandler;
