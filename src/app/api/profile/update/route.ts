// app/api/profile/update/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
export async function PUT(request: Request) {
    const session = await getServerSession({ req: request }, authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { bio, avatar } = await request.json();

    try {
        const result = await sql`
            UPDATE Users
            SET bio = ${bio}, avatar = ${avatar}
            WHERE email = ${session.user.email}
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
