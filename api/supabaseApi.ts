import { supabase } from '@/lib/supabase';

export const api = {
  
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles_test')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  getProfileDetails: async (userId: string) => {
    const { data, error } = await supabase
      .from('profile_details')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles_test')
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

  getPotentialDiveMatches: async (userId: string, limit: number) => {
    const { data, error } = await supabase.rpc('get_potential_dive_matches', {
      user_id: userId,
      limit_count: limit,
    });
    
    if (error) throw error;
    return data;
  },

  recordMatchAction: async (userId: string, matchedUserId: string, action: 'like' | 'dislike') => {
    const { data, error } = await supabase
      .rpc('handle_match_action', { 
        acting_user_id: userId, 
        target_user_id: matchedUserId,
        match_action: action === 'like' ? 1 : 0,
      });
    
    if (error) {
      console.error('Error in handle_match_action:', error);
    } else {
      console.log('Match action handled, is new match:', data);
    }
  },




};