// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { sql } from '@vercel/postgres';

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT username, email, bio, avatar FROM Users WHERE id = ${userId}`;
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter dados do usuário', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
};

export default userHandler;
