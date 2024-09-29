import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs'; // Consider using 'bcrypt' instead of 'bcryptjs' for better performance
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aipapai'; // Use an environment variable for security

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ 
      user: { id: user.id, username: user.username, email: user.email },
      token
    }), { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    return new Response(JSON.stringify({ message: 'Error logging in' }), { status: 500 });
  }
}
