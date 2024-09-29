import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aipapai';

const authenticate = async (req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

export async function GET(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
    }

    try {
        const { rows } = await sql`SELECT * FROM Users`;
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao procurar usuário', error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
    }

    const { username, email, bio, avatar, password } = await req.json();

    try {
        const { rows } = await sql`
            INSERT INTO Users (username, email, bio, avatar, password)
            VALUES (${username}, ${email}, ${bio}, ${avatar}, ${password})
            RETURNING *`;
        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao criar usuário', error }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
    }

    const { id, updatedUsername, updatedEmail, updatedBio, updatedAvatar } = await req.json();

    try {
        const { rows } = await sql`
            UPDATE Users
            SET username = ${updatedUsername}, email = ${updatedEmail}, bio = ${updatedBio}, avatar = ${updatedAvatar}
            WHERE id = ${id}
            RETURNING *`;
        if (rows.length === 0) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao atualizar', error }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
    }

    const { userId } = await req.json();

    try {
        const { rowCount } = await sql`
            DELETE FROM Users
            WHERE id = ${userId}`;
        if (rowCount === 0) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao deletar usuário', error }, { status: 400 });
    }
}
