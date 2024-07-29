// hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { fetchStreamToken } from '@/api/auth';

export const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
          setSession(session); // Set session without Stream token
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
          setSession(session); // Set session without Stream token
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session;
};