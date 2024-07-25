import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { StreamChat } from 'https://esm.sh/stream-chat@8.37.0'

const STREAM_API_KEY = Deno.env.get('STREAM_API_KEY')
const STREAM_API_SECRET = Deno.env.get('STREAM_API_SECRET')

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  throw new Error('STREAM_API_KEY or STREAM_API_SECRET is not set')
}

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

serve(async (req) => {
  try {
    const { user } = await req.json()

    if (!user || !user.id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = serverClient.createToken(user.id)

    return new Response(
      JSON.stringify({ token }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-stream-token:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})