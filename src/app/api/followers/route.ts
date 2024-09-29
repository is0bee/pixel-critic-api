import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    try {
        const { rows } = await sql`
            SELECT * FROM followers WHERE following_id = ${userId}`;
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao procurar seguidores', error }, { status: 500 });
    }
}


export async function POST(request: Request) {
    const { userId, followerId } = await request.json(); // userId é quem segue, followerId é quem está sendo seguido

    try {
        const { rows } = await sql`
            INSERT INTO followers (follower_id, following_id)
            VALUES (${followerId}, ${userId})
            RETURNING *`;
        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao seguir usuário', error }, { status: 400 });
    }
}


export async function DELETE(request: Request) {
    const { userId, followerId } = await request.json();

    try {
        const { rowCount } = await sql`
            DELETE FROM followers
            WHERE follower_id = ${followerId} AND following_id = ${userId}`;
        if (rowCount === 0) {
            return NextResponse.json({ message: 'Não se seguem mutuamente' }, { status: 404 });
        }
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao deixar de seguir', error }, { status: 400 });
    }
}
