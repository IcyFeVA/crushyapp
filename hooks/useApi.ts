import { useState, useCallback } from 'react';
import { api } from '@/api/supabaseApi';
import { useAuth } from '@/hooks/useAuth';

export const useProfile = () => {
  const session = useAuth();
  const [profileDetails, setProfileDetails] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentUserProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
        const data = await api.getCurrentUserProfile(session.user.id);
        console.log('Fetched Current User Profile:', data);
        setCurrentUserProfile(data);
    } catch (err) {
        console.error('Error fetching current user profile:', err);
        setError(err);
    } finally {
        setLoading(false);
    }
}, [session]);

const fetchProfileDetails = useCallback(async (userId: string) => {
    if (!userId) return null;
    try {
        const data = await api.getProfileDetails(userId);
        console.log('Fetched Profile Details:', data);
        return data;
    } catch (err) {
        console.error('Error fetching profile details:', err);
        setError(err);
        return null;
    }
}, []);

  return { profileDetails, loading, error, fetchProfileDetails, fetchCurrentUserProfile, currentUserProfile };
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



  const fetchDiveMatches = useCallback(async (limit = 10) => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
        const data = await api.getPotentialDiveMatches(session.user.id, limit);
        console.log('Fetched Dive Matches:', data);
        setMatches(data);
    } catch (err) {
        console.error('Error fetching dive matches:', err);
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

  return { matches, loading, error, fetchMatches, fetchDiveMatches, recordAction };
};

