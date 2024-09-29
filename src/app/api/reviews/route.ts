import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aipapai';

export async function POST(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let user_id: string;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        user_id = decoded.id;
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        const { game, review } = await req.json();
        const { content, rating, game_id: reviewGameId } = review;

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

        return NextResponse.json(reviewInsert.rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating review', error }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let user_id: string;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        user_id = decoded.id;
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { reviewId } = await req.json();

    try {
        const { rowCount } = await sql`
            DELETE FROM Reviews WHERE id = ${reviewId} AND user_id = ${user_id}`;
        if (rowCount === 0) {
            return NextResponse.json({ message: 'Review not found or not authorized to delete' }, { status: 404 });
        }
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting review', error }, { status: 400 });
    }
}
