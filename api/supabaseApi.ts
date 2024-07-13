import { supabase } from '@/lib/supabase';

export const api = {
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...updates })
      .select();
    
    if (error) throw error;
    return data;
  },

  getPotentialMatches: async (userId: string, limit: number) => {
    const { data, error } = await supabase.rpc('get_potential_matches', {
      user_id: userId,
      limit_count: limit,
    });
    
    if (error) throw error;
    return data;
  },

  recordMatchAction: async (userId: string, matchedUserId: string, action: 'like' | 'dislike') => {
    const { error } = await supabase
      .from('matches')
      .insert({
        user1_id: userId,
        user2_id: matchedUserId,
        user1_action: action === 'like' ? 1 : 0,
      });
    
    if (error) throw error;
  },

  // Add more API functions as needed
};