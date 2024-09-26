import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

const usersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            try {
                const { rows } = await sql`SELECT * FROM Users`;
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'erro ao procurar usuario', error });
            }
            break;

        case 'POST':
            const { username, email, bio, avatar } = req.body;

            try {
                const { rows } = await sql`
                    INSERT INTO Users (username, email, bio, avatar)
                    VALUES (${username}, ${email}, ${bio}, ${avatar})
                    RETURNING *`;
                res.status(201).json(rows[0]);
            } catch (error) {
                res.status(400).json({ message: 'erro ao criar usuario', error });
            }
            break;

        case 'PUT':
            const { id, updatedUsername, updatedEmail, updatedBio, updatedAvatar } = req.body;

            try {
                const { rows } = await sql`
                    UPDATE Users
                    SET username = ${updatedUsername}, email = ${updatedEmail}, bio = ${updatedBio}, avatar = ${updatedAvatar}
                    WHERE id = ${id}
                    RETURNING *`;
                if (rows.length === 0) {
                    return res.status(404).json({ message: 'usuario nao encontrado' });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(400).json({ message: 'erro ao atualizar', error });
            }
            break;

        case 'DELETE':
            const { userId } = req.body;

            try {
                const { rowCount } = await sql`
                    DELETE FROM Users
                    WHERE id = ${userId}`;
                if (rowCount === 0) {
                    return res.status(404).json({ message: 'usuario nao encontrado' });
                }
                res.status(204).end();
            } catch (error) {
                res.status(400).json({ message: 'erro ao deletar usuario', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default usersHandler;
