"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { SchoolWall } from "@/components/views/SchoolWall";
import { HagwonWall } from "@/components/views/HagwonWall";
import { MyStik } from "@/components/views/MyStik";
import { MemoryFragments } from "@/components/views/MemoryFragments";
import { Countdown } from "@/components/views/Countdown";
import { MatchModals } from "@/components/MatchModals";
import { Onboarding } from "@/components/views/Onboarding";
import { YoutubeBGM } from "@/components/YoutubeBGM";
import { useAuth } from "@/lib/useAuth";

export default function Home() {
  useAuth(); // initialize auth
  const [activeTab, setActiveTab] = useState('v1');
  const [matchStep, setMatchStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('stik_onboarded')) {
      setShowOnboarding(true);
    }
  }, []);

  const finishOnboarding = () => {
    localStorage.setItem('stik_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="flex flex-col min-h-screen pb-[72px] md:pb-0">
      {showOnboarding && <Onboarding onComplete={finishOnboarding} />}
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full max-w-[1200px] mx-auto">
        <div className={activeTab === 'v1' ? 'block' : 'hidden'}><SchoolWall /></div>
        <div className={activeTab === 'v5' ? 'block' : 'hidden'}><HagwonWall /></div>
        <div className={activeTab === 'v2' ? 'block' : 'hidden'}><MyStik /></div>
        <div className={activeTab === 'v3' ? 'block' : 'hidden'}><MemoryFragments /></div>
        <div className={activeTab === 'v4' ? 'block' : 'hidden'}><Countdown /></div>
      </main>

      <YoutubeBGM videoId="s7X3Yicm3yI" />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <MatchModals step={matchStep} setStep={setMatchStep} />
      
      {/* Test Button for Match Flow */}
      {activeTab === 'v2' && (
        <button 
          className="fixed bottom-24 right-5 md:bottom-10 md:right-10 bg-gold text-[#0c0a07] px-4 py-2 font-nanum text-xs font-bold shadow-lg z-40 rounded-full"
          onClick={() => setMatchStep(1)}
        >
          매칭 플로우 테스트 ✦
        </button>
      )}
    </div>
  );
}
