// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Importando getSession
import { sql } from '@vercel/postgres';

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req }); // Obtendo a sessão

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' }); // Verificando se a sessão existe
  }

  const userId = session.user.id; // Obtendo o ID do usuário a partir da sessão

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
