// api/auth.ts

import { supabase } from '@/lib/supabase';

export async function fetchStreamToken(userId: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-stream-token', {
      body: { user: { id: userId } },
    });

    if (error) throw error;
    if (!data || !data.token) throw new Error('No token received');

    return data.token;
  } catch (error) {
    console.error('Error fetching Stream token:', error);
    throw error;
  }
}