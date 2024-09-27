import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'; // ajuste o caminho conforme necessário

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  console.log('Session:', session);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { bio, avatar } = req.body;

  try {
    const result = await sql`
      UPDATE Users
      SET bio = ${bio}, avatar = ${avatar}
      WHERE email = ${session.user.email}
    `;

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateProfile;
