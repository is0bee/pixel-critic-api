import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

const topfourHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            const { user_id } = req.query;
            try {
                const { rows } = await sql`
                    SELECT * FROM Topfour WHERE user_id = ${user_id} ORDER BY position`;
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Erro ao buscar top 4 games', error });
            }
            break;

        case 'POST':
            const { userId, gameId, position } = req.body;

            try {
                const { rows } = await sql`
                    INSERT INTO Topfour (user_id, game_id, position)
                    VALUES (${userId}, ${gameId}, ${position})
                    ON CONFLICT (user_id, position) DO UPDATE SET game_id = ${gameId}
                    RETURNING *`;
                res.status(201).json(rows[0]);
            } catch (error) {
                res.status(400).json({ message: 'Erro ao atualizar top 4 games', error });
            }
            break;

        case 'DELETE':
            const { userIdToDelete, positionToDelete } = req.body;

            try {
                const { rowCount } = await sql`
                    DELETE FROM Topfour WHERE user_id = ${userIdToDelete} AND position = ${positionToDelete}`;
                if (rowCount === 0) {
                    return res.status(404).json({ message: 'Top game não encontrado' });
                }
                res.status(204).end();
            } catch (error) {
                res.status(400).json({ message: 'Erro ao deletar top game', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default topfourHandler;
