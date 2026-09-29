"use client";
import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import { getSupabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [username, setUsername] = useState('');
  const [referral, setReferral] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { user, needsUsername, setNeedsUsername, setProfile } = useAuth();
  const { signInWithGoogle } = useAuth();

  const showUsernameModal = needsUsername && user;

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
    } else {
      if (!showUsernameModal) document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab, showUsernameModal]);

  useEffect(() => {
    if (showUsernameModal) document.body.style.overflow = 'hidden';
  }, [showUsernameModal]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      if (!getSupabase()) {
        onClose();
      }
    } catch (e) {
      console.error(e);
      alert('Google sign-in failed. Configure Supabase env vars in .env.local');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setIsSubmitting(true);
    const supabase = getSupabase();
    try {
      if (supabase && user) {
        const { error } = await supabase.from('profiles').upsert({
          id: user.id,
          username: username.trim(),
          referral_code: referral.trim() || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
        setProfile({ username: username.trim(), referralCode: referral.trim(), avatarUrl: user.user_metadata?.avatar_url });
      } else {
        const mockProfile = { username: username.trim(), referralCode: referral.trim() };
        setProfile(mockProfile);
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('shuffle_mock_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            localStorage.setItem('shuffle_mock_user', JSON.stringify({ user: parsed.user, profile: mockProfile }));
          }
        }
      }
      setNeedsUsername(false);
      setUsername('');
      setReferral('');
    } catch (err) {
      console.error(err);
      alert('Failed to save username');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showUsernameModal) {
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-0 lg:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            data-testid="modal-content-AUTH"
            className="ModalContent_modalContent__rbnMN GlobalModal_authModalContent__wj48B relative w-full h-[100dvh] lg:h-[768px] lg:max-w-[1000px] bg-[#0e0e15] lg:rounded-[16px] overflow-hidden flex shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="w-full h-full">
              <div className="w-full h-full overflow-y-auto">
                <div className="AuthModal_desktop__UyUut flex w-full h-full">
                  <div className="AuthModal_authModalLeft__cZNrH hidden lg:flex lg:w-[50%] relative overflow-hidden bg-[#0a0a0f]">
                    <img className="AuthModal_backgroundImage__HSV1e absolute inset-0 w-full h-full object-cover" alt="auth-backdrop" src="https://shuffle.com/images/login-panel.jpg" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/login-panel.jpg'; } }} />
                    <div className="AuthModal_backgroundGradient__R6sGB absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-black/30"></div>
                    <img className="AuthModal_logo__Ididm absolute top-8 left-8 h-[28px] w-auto brightness-0 invert" alt="logo" src="https://i.postimg.cc/6QzR8npH/log0.png" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/logo.svg'; } }} />
                    <p className="AuthModal_terms__a6xZU absolute bottom-8 left-8 right-8 text-white/70 text-[12px] leading-[1.5] text-center">
                      By accessing the site, I attest that I am at least 18 years old and have read the&nbsp;
                      <a target="_blank" href="/info/terms" className="text-white underline">Terms and Conditions</a>
                    </p>
                  </div>
                  <div className="AuthModal_authModalRight__Lo6zo w-full lg:w-[50%] bg-[#121214] flex flex-col justify-center">
                    <div className="AuthModal_authModalInner__IuOJ2 px-6 lg:px-10 py-8" style={{ opacity: 1, transform: 'none' }}>
                      <form id="register-oauth-form" className="RegisterMoreDetails_root___2Y1_" onSubmit={handleUsernameSubmit}>
                        <div className="Flex_root__yC03I Flex_column__BLL17 Flex_lg1__ImBWi flex flex-col gap-6">
                          <div className="Flex_root__yC03I Flex_column__BLL17 Flex_md2__0Smxc flex flex-col gap-6">
                            <div className="Flex_root__yC03I Flex_column__BLL17 Flex_md2__0Smxc ModalHeader_root__EfKAa flex flex-col items-center gap-4 text-center">
                              <img alt="register" src="/icons/register-more.svg" className="w-12 h-12" />
                              <div>
                                <h3 className="Heading_root__Z7xp1 Heading_h3__GvMSB Heading_center__7_k8J ModalHeader_heading__oJ1V8 text-white font-bold text-[20px] mb-2">We just need a few more details...</h3>
                                <div className="ModalHeader_text__00fWH text-[#8b8ba7] text-[13px] leading-[1.5]">
                                  <p>You can create a username now or edit it later in Settings. Got a referral code? You can add that too.</p>
                                </div>
                              </div>
                            </div>
                            <div className="TextInput_formControlWrapper__iBF1i">
                              <div className="TextInput_labelGroup__ZxQjE mb-2">
                                <div className="LabelBlock_root__0vEsV TextInput_labelBlock__iLyI1">
                                  <label className="TextInput_label__J8l6V text-white text-[13px] font-medium"><span>Username*</span></label>
                                </div>
                              </div>
                              <div className="InputWrapper_root__4rgbp">
                                <input className="Input_root__lWEbp w-full h-[48px] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[8px] px-4 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#7717ff]" placeholder="Enter a username" autoCapitalize="none" autoCorrect="off" spellCheck="false" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                              </div>
                            </div>
                            <div className="TextInput_formControlWrapper__iBF1i">
                              <div className="TextInput_labelGroup__ZxQjE mb-2">
                                <div className="LabelBlock_root__0vEsV TextInput_labelBlock__iLyI1">
                                  <label className="TextInput_label__J8l6V text-white text-[13px] font-medium"><span>Referral Code</span></label>
                                </div>
                              </div>
                              <div className="InputWrapper_root__4rgbp">
                                <input className="Input_root__lWEbp w-full h-[48px] bg-[#1e1e2e] border border-[#1e1e2e] rounded-[8px] px-4 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" placeholder="Enter referral code" name="referrer" value={referral} onChange={(e) => setReferral(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <button type="submit" disabled={!username.trim() || isSubmitting} form="register-oauth-form" className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_primary__zlUoe w-full h-[48px] bg-[#7717ff] hover:bg-[#8b3dff] disabled:bg-[#2a2a3e] disabled:text-[#5a5a7a] disabled:cursor-not-allowed text-white rounded-[8px] text-[14px] font-bold transition-colors">
                            <span className="ButtonVariants_buttonContent__mRPrs">{isSubmitting ? 'Saving...' : 'Done'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-0 lg:p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }} className="relative w-full h-[100dvh] lg:h-[720px] lg:max-w-[1000px] bg-[#0e0e15] lg:rounded-[16px] overflow-hidden flex shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>

          <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden bg-[#0a0a0f]">
            <img src="https://shuffle.com/images/login-panel.jpg" alt="auth-backdrop" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/images/login-panel.jpg'; } }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col justify-between w-full h-full p-8">
              <div>
                <img src="https://i.postimg.cc/6QzR8npH/log0.png" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/logo.svg'; } }} alt="SHUFFLE" className="h-[28px] w-auto brightness-0 invert block" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-5 -mt-8">
                <div className="flex items-center gap-5">
                  <img src="https://shuffle.com/icons/shuffle-logo.svg" alt="S" className="w-[64px] h-[64px] object-contain block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/token-white.svg'; } }} />
                  <div className="w-px h-[44px] bg-white/20" />
                  <img src="https://shuffle.com/images/partners/sunderland-afc.svg" alt="Sunderland A.F.C" className="w-[68px] h-[68px] object-contain block" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <img src="https://shuffle.com/icons/premier-league.svg" alt="Premier League" className="h-[36px] w-auto mt-2 brightness-0 invert opacity-90 block" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="flex items-center gap-2 -mt-2">
                  <span className="text-white/80 text-[12px] font-bold tracking-widest uppercase">Premier League</span>
                </div>
              </div>
              <p className="text-white/70 text-[12px] leading-[1.5] text-center max-w-[340px] mx-auto">
                By accessing the site, I attest that I am at least 18 years old and have read the <a href="/info/terms" target="_blank" className="text-white underline hover:text-white/80">Terms and Conditions</a>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[50%] bg-[#121214] flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 lg:px-10 py-8 lg:py-10">
                <div className="flex border-b border-[#2a2a3e] mb-8">
                  <button onClick={() => setActiveTab('register')} className={`flex-1 pb-4 text-[15px] font-medium transition-colors relative ${activeTab === 'register' ? 'text-[#8b5cf6]' : 'text-[#8b8ba7] hover:text-white'}`}>
                    Register
                    {activeTab === 'register' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8b5cf6]" />}
                  </button>
                  <button onClick={() => setActiveTab('login')} className={`flex-1 pb-4 text-[15px] font-medium transition-colors relative ${activeTab === 'login' ? 'text-[#8b5cf6]' : 'text-[#8b8ba7] hover:text-white'}`}>
                    Login
                    {activeTab === 'login' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8b5cf6]" />}
                  </button>
                </div>

                {activeTab === 'login' && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-white text-[13px] font-medium mb-2">Email or Username*</label>
                        <input placeholder="Enter Email or Username" className="w-full h-[48px] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[8px] px-4 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#8b5cf6]" />
                      </div>
                      <div>
                        <label className="block text-white text-[13px] font-medium mb-2">Password*</label>
                        <div className="relative">
                          <input type={showPassword ? 'text' : 'password'} placeholder="Enter Password" className="w-full h-[48px] bg-[#1e1e2e] border border-[#1e1e2e] rounded-[8px] px-4 pr-12 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#8b8ba7] hover:text-white">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <div className="flex justify-end mt-2">
                          <button type="button" className="text-white text-[13px] font-medium underline hover:text-[#8b8ba7]">Forgot Password?</button>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button type="submit" className="w-full h-[48px] bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[8px] text-[14px] font-bold transition-colors">Login</button>
                      </div>
                      <div className="text-center text-white text-[13px] py-2">Or continue with</div>
                      <div className="grid grid-cols-3 gap-3">
                        <button type="button" onClick={handleGoogleSignIn} disabled={googleLoading} className="h-[48px] bg-transparent border border-[#2a2a3e] hover:border-[#3a3a4a] hover:bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-colors disabled:opacity-50">
                          <img src="https://shuffle.com/icons/brands/google.svg" alt="Google" width={20} height={20} className="w-5 h-5 block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/brands/google.svg'; } }} />
                        </button>
                        <button type="button" className="h-[48px] bg-transparent border border-[#2a2a3e] hover:border-[#3a3a4a] hover:bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-colors">
                          <img src="https://shuffle.com/icons/brands/line.svg" alt="LINE" width={20} height={20} className="w-5 h-5 block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/brands/line.svg'; } }} />
                        </button>
                        <button type="button" className="h-[48px] bg-transparent border border-[#2a2a3e] hover:border-[#3a3a4a] hover:bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-colors">
                          <img src="https://shuffle.com/icons/brands/telegram.svg" alt="Telegram" width={20} height={20} className="w-5 h-5 block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/brands/telegram.svg'; } }} />
                        </button>
                      </div>
                      {!getSupabase() && <p className="text-[11px] text-[#5a5a7a] text-center mt-3">Supabase not configured - using mock auth for demo. Set NEXT_PUBLIC_SUPABASE_URL and ANON_KEY in .env</p>}
                    </form>
                  </motion.div>
                )}

                {activeTab === 'register' && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-white text-[13px] font-medium mb-2">Username*</label>
                        <input placeholder="Enter Username" className="w-full h-[48px] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[8px] px-4 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" />
                      </div>
                      <div>
                        <label className="block text-white text-[13px] font-medium mb-2">Email*</label>
                        <input placeholder="Enter Email" type="email" className="w-full h-[48px] bg-[#1e1e2e] border border-[#1e1e2e] rounded-[8px] px-4 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" />
                      </div>
                      <div>
                        <label className="block text-white text-[13px] font-medium mb-2">Password*</label>
                        <div className="relative">
                          <input type={showPassword ? 'text' : 'password'} placeholder="Enter Password" className="w-full h-[48px] bg-[#1e1e2e] border border-[#1e1e2e] rounded-[8px] px-4 pr-12 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#8b8ba7] hover:text-white">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="border-t border-b border-[#1e1e2e] py-4">
                        <button type="button" onClick={() => setShowReferral(!showReferral)} className="w-full flex items-center justify-between text-white text-[13px] font-medium">
                          <span>Referral Code (Optional)</span>
                          <ChevronDown size={18} className={`text-[#8b8ba7] transition-transform ${showReferral ? 'rotate-180' : ''}`} />
                        </button>
                        {showReferral && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                            <input placeholder="Enter Referral Code" className="w-full h-[44px] bg-[#1e1e2e] border border-[#1e1e2e] rounded-[8px] px-4 text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" />
                          </motion.div>
                        )}
                      </div>
                      <div className="flex items-start gap-3">
                        <button type="button" onClick={() => setAgreeTerms(!agreeTerms)} className={`w-5 h-5 rounded-[4px] border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${agreeTerms ? 'bg-[#7717ff] border-[#7717ff]' : 'bg-transparent border-[#2a2a3e] hover:border-[#3a3a4a]'}`}>
                          {agreeTerms && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5l10 -10" /></svg>}
                        </button>
                        <span className="text-white/80 text-[13px] leading-[1.4]">I agree to Snuffle&apos;s <a href="/info/terms" className="text-white font-bold underline">Terms of Service</a> and <a href="/info/privacy" className="text-white font-bold underline">Privacy Policy</a></span>
                      </div>
                      <button type="submit" className="w-full h-[48px] bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[8px] text-[14px] font-bold transition-colors">Register</button>
                      <div className="text-center text-white text-[13px] py-2">Or continue with</div>
                      <div className="grid grid-cols-3 gap-3">
                        <button type="button" onClick={handleGoogleSignIn} disabled={googleLoading} className="h-[48px] bg-transparent border border-[#2a2a3e] hover:border-[#3a3a4a] hover:bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-colors disabled:opacity-50">
                          <img src="https://shuffle.com/icons/brands/google.svg" alt="Google" width={20} height={20} className="w-5 h-5 block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/brands/google.svg'; } }} />
                        </button>
                        <button type="button" className="h-[48px] bg-transparent border border-[#2a2a3e] hover:border-[#3a3a4a] hover:bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-colors">
                          <img src="https://shuffle.com/icons/brands/line.svg" alt="LINE" width={20} height={20} className="w-5 h-5 block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/brands/line.svg'; } }} />
                        </button>
                        <button type="button" className="h-[48px] bg-transparent border border-[#2a2a3e] hover:border-[#3a3a4a] hover:bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-colors">
                          <img src="https://shuffle.com/icons/brands/telegram.svg" alt="Telegram" width={20} height={20} className="w-5 h-5 block" onError={(e) => { const t = e.currentTarget; if (!t.dataset.fallback) { t.dataset.fallback = '1'; t.src = '/icons/brands/telegram.svg'; } }} />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
              <div className="lg:hidden px-6 pb-8">
                <p className="text-white/40 text-[11px] leading-[1.5] text-center">By accessing the site, I attest that I am at least 18 years old and have read the <a href="/info/terms" className="text-white/60 underline">Terms and Conditions</a></p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
