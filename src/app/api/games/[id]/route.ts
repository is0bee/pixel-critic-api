import { NextResponse } from 'next/server';

const RAWG_API_KEY = process.env.RAWG_API_KEY;

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`);

        if (!response.ok) {
            return NextResponse.json({ message: 'Game not found or API error' }, { status: response.status });
        }

        const gameData = await response.json();
        return NextResponse.json(gameData, { status: 200 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
