import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aipapai';

export async function PUT(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; // Type assertion

        const { bio, avatar } = await request.json();

        const result = await sql`
            UPDATE Users
            SET bio = ${bio}, avatar = ${avatar}
            WHERE email = ${decoded.email}
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token or updating profile:', error);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}
