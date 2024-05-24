import axios from 'axios';

const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const clientId = process.env.SPOTIFY_CLIENT_ID;

const authToken = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export async function getSpotifyToken() {
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
            headers: {
                Authorization: `Basic ${authToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );

    return response.data.access_token;
}

export async function searchSpotifyTrack(query: string) {
    const token = await getSpotifyToken();

    const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query,
        )}&type=track`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
}
