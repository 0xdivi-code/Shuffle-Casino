"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function CasinoRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/'); }, [router]);
  return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">Redirecting to Casino...</div>;
}
