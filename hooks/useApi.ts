import { useState, useCallback } from 'react';
import { api } from '@/api/supabaseApi';
import { useAuth } from '@/hooks/useAuth';

export const useProfile = () => {
  const session = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const data = await api.getProfile(session.user.id);
      setProfile(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [session]);
  

  const updateProfile = useCallback(async (updates) => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const data = await api.updateProfile(session.user.id, updates);
      setProfile(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  return { profile, loading, error, fetchProfile, updateProfile };
};

export const usePotentialMatches = () => {
  const session = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = useCallback(async (limit = 10) => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const data = await api.getPotentialMatches(session.user.id, limit);
      setMatches(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const recordAction = useCallback(async (matchedUserId: string, action: 'like' | 'dislike') => {
    if (!session?.user?.id) return;
    try {
      await api.recordMatchAction(session.user.id, matchedUserId, action);
    } catch (err) {
      setError(err);
    }
  }, [session]);

  return { matches, loading, error, fetchMatches, recordAction };
};

