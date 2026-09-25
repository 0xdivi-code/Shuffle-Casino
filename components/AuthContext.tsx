"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  username: string;
  referralCode?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  needsUsername: boolean;
  setNeedsUsername: (v: boolean) => void;
  setProfile: (p: Profile | null) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  needsUsername: false,
  setNeedsUsername: () => {},
  setProfile: () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsUsername, setNeedsUsername] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      // No supabase configured - check localStorage fallback for demo
      const stored = typeof window !== 'undefined' ? localStorage.getItem('shuffle_mock_user') : null;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed.user);
          setProfile(parsed.profile);
          if (!parsed.profile?.username) setNeedsUsername(true);
        } catch {}
      }
      setLoading(false);
      return;
    }

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single();
        if (profileData) {
          setProfile({ username: profileData.username, referralCode: profileData.referral_code, avatarUrl: profileData.avatar_url });
        } else {
          // new user, no profile yet
          setNeedsUsername(true);
        }
      }
      setLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (event === 'SIGNED_IN' && sess?.user) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', sess.user.id).single();
        if (!profileData) {
          setNeedsUsername(true);
        } else {
          setProfile({ username: profileData.username, referralCode: profileData.referral_code, avatarUrl: profileData.avatar_url });
        }
      }
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setNeedsUsername(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      // Mock flow for demo without env
      const mockUser = { id: 'mock-id', email: 'demo@example.com', user_metadata: { full_name: 'Demo User', avatar_url: '' } } as any;
      const mockSession = { user: mockUser } as any;
      setUser(mockUser);
      setSession(mockSession);
      setNeedsUsername(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('shuffle_mock_user', JSON.stringify({ user: mockUser, profile: null }));
      }
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shuffle_mock_user');
      }
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    setNeedsUsername(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, needsUsername, setNeedsUsername, setProfile, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
