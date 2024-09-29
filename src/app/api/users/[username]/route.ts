import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getSession } from 'next-auth/react'; 

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const { username } = params;
    console.log('Requested username:', username);

    if (!username) {
        return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    try {
        const { rows } = await sql`SELECT * FROM Users WHERE username = ${username}`;
        if (rows.length === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function POST(req: Request, { params }: { params: { username: string } }) {
    const { username } = params;
    const session = await getSession();
    
    // Debugging: log session information
    console.log('Session:', session);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { action } = await req.json(); 

    try {
        if (action === 'follow') {
            await sql`INSERT INTO Followers (user_id, follower_id) VALUES ((SELECT id FROM Users WHERE username = ${username}), ${userId})`;
            return NextResponse.json({ message: 'User followed successfully' }, { status: 200 });
        } else if (action === 'unfollow') {
            await sql`DELETE FROM Followers WHERE user_id = (SELECT id FROM Users WHERE username = ${username}) AND follower_id = ${userId}`;
            return NextResponse.json({ message: 'User unfollowed successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error processing follow/unfollow:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
