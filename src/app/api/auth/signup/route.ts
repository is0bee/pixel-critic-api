import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email;
    `;

    return new Response(JSON.stringify({ user: rows[0] }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating user', error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
