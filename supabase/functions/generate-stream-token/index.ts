import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const STREAM_API_KEY = Deno.env.get('STREAM_API_KEY')
const STREAM_API_SECRET = Deno.env.get('STREAM_API_SECRET')

function createToken(userId: string): string {
  const header = {
    alg: 'HS256',
    type: 'JWT',
  };

  const payload = {
    user_id: userId,
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  try {
    const signature = sign(`${encodedHeader}.${encodedPayload}`, STREAM_API_SECRET!);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  } catch (error) {
    throw new Error(`Error creating token: ${error.message}`);
  }
}

async function sign(message: string, secret: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(message)
    );
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  } catch (error) {
    throw new Error(`Error signing message: ${error.message}`);
  }
}

serve(async (req) => {
  try {
    if (!STREAM_API_KEY || !STREAM_API_SECRET) {
      throw new Error('STREAM_API_KEY or STREAM_API_SECRET is not set');
    }

    const body = await req.json();
    const { user } = body;

    if (!user || !user.id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = await createToken(user.id);

    return new Response(
      JSON.stringify({ token }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-stream-token:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message, stack: error.stack }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})