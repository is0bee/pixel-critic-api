import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const RAWG_API_KEY = process.env.RAWG_API_KEY;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    console.log(`Fetching favorites for user_id: ${user_id}`);

    if (!user_id) {
        return NextResponse.json({ message: 'User id required' }, { status: 400 });
    }

    try {
        const { rows } = await sql`
            SELECT Games.* FROM Favorites
            JOIN Games ON Favorites.game_id = Games.id
            WHERE Favorites.user_id = ${user_id}
            ORDER BY Favorites.created_at`;
        
        console.log(`Rows returned: ${JSON.stringify(rows)}`);
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching favorite games', error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { userId, gameId } = await req.json();

    if (!userId || !gameId) {
        return NextResponse.json({ message: 'User ID and Game ID are required' }, { status: 400 });
    }

    // Fetch the game data from RAWG API
    const RAWG_API_KEY = process.env.RAWG_API_KEY;

    let gameData;
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`);
        if (!response.ok) {
            return NextResponse.json({ message: 'Game not found or API error' }, { status: response.status });
        }
        gameData = await response.json();
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching game data', error }, { status: 500 });
    }

    // Ensure that the required fields are present
    const { id: apiGameId, name: title, description, background_image, released: release_date, platforms } = gameData; // Adjust based on the actual API response structure

    if (!apiGameId || !title || !description) {
        return NextResponse.json({ message: 'Game ID, title, and description are required' }, { status: 400 });
    }

    try {
        // Insert game data into the Games table with API ID
        const { rows } = await sql`
            INSERT INTO Games (id, title, description, release_date, platform, background_image)
            VALUES (${apiGameId}, ${title}, ${description}, ${release_date}, ${platforms}, ${background_image})
            ON CONFLICT (id) DO NOTHING
            RETURNING *`;

        // Now insert into Favorites
        const favoriteInsert = await sql`
            INSERT INTO Favorites (user_id, game_id)
            VALUES (${userId}, ${apiGameId})
            ON CONFLICT (user_id, game_id) DO NOTHING
            RETURNING *`;

        return NextResponse.json(favoriteInsert.rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error adding to favorites', error }, { status: 400 });
    }
}



export async function DELETE(req: Request) {
    const { userId, gameId } = await req.json();

    if (!userId || !gameId) {
        return NextResponse.json({ message: 'User ID and Game ID are required' }, { status: 400 });
    }

    try {
        const { rowCount } = await sql`
            DELETE FROM Favorites WHERE user_id = ${userId} AND game_id = ${gameId}`;
        
        if (rowCount === 0) {
            return NextResponse.json({ message: 'Favorite game not found' }, { status: 404 });
        }

        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: 'Error removing favorite', error }, { status: 400 });
    }
}
