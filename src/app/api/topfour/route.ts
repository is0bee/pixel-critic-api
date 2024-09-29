import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    console.log(`Fetching Topfour for user_id: ${user_id}`);

    if (!user_id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const { rows } = await sql`
            SELECT * FROM Topfour WHERE user_id = ${user_id} ORDER BY position`;
        console.log(`Rows returned: ${JSON.stringify(rows)}`); 
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar top 4 games', error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { userId, gameId, position } = await req.json();

    try {
        const { rows } = await sql`
            INSERT INTO Topfour (user_id, game_id, position)
            VALUES (${userId}, ${gameId}, ${position})
            ON CONFLICT (user_id, position) DO UPDATE SET game_id = ${gameId}
            RETURNING *`;
        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao atualizar top 4 games', error }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    const { userIdToDelete, positionToDelete } = await req.json();

    try {
        const { rowCount } = await sql`
            DELETE FROM Topfour WHERE user_id = ${userIdToDelete} AND position = ${positionToDelete}`;
        if (rowCount === 0) {
            return NextResponse.json({ message: 'Top game não encontrado' }, { status: 404 });
        }
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao deletar top game', error }, { status: 400 });
    }
}
