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
        try {
            console.log('getting stream token')
          const streamToken = await fetchStreamToken(session.user.id);
          setSession({ ...session, streamToken });
          console.log('stream token set', streamToken)
        } catch (error) {
          console.error('Failed to fetch Stream token:', error);
          setSession(session); // Set session without Stream token
        }
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        try {
          const streamToken = await fetchStreamToken(session.user.id);
          setSession({ ...session, streamToken });
        } catch (error) {
          console.error('Failed to fetch Stream token:', error);
          setSession(session); // Set session without Stream token
        }
      } else {
        setSession(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session;
};