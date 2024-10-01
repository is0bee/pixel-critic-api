import { sql } from '@vercel/postgres';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'aipapai';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get('game_id');
    const userId = searchParams.get('user_id');

    if (gameId) {
        try {
            const reviews = await sql`
                SELECT Reviews.*, Games.title, Games.background_image
                FROM Reviews
                JOIN Games ON Reviews.game_id = Games.id
                WHERE Reviews.game_id = ${gameId}`;
            
            return NextResponse.json(reviews.rows, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Error fetching reviews', error }, { status: 400 });
        }
    } else if (userId) {
        try {
            const reviews = await sql`
                SELECT Reviews.*, Games.title, Games.background_image
                FROM Reviews
                JOIN Games ON Reviews.game_id = Games.id
                WHERE Reviews.user_id = ${userId}`;
            
            return NextResponse.json(reviews.rows, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Error fetching user reviews', error }, { status: 400 });
        }
    }

    return NextResponse.json({ message: 'Game ID or User ID required' }, { status: 400 });
}


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
        const { game, review, background_image } = await req.json();
        const { content, rating, game_id: reviewGameId } = review;


        const gameInsert = await sql`
            INSERT INTO Games (title, description, release_date, platform, background_image)
            VALUES (${game.title}, ${game.description}, ${game.release_date}, ${game.platform}, ${background_image})
            ON CONFLICT (id) DO NOTHING
            RETURNING id`;

        const insertedGameId = gameInsert.rows[0]?.id || reviewGameId;

        const reviewInsert = await sql`
            INSERT INTO Reviews (user_id, content, rating, game_id)
            VALUES (${user_id}, ${content}, ${rating}, ${insertedGameId})
            RETURNING *`;

        return NextResponse.json(reviewInsert.rows[0], { status: 201 });
    } catch (error) {
        console.log(error)
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
