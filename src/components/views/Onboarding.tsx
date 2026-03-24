"use client";

import { useState, useEffect } from "react";

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2500);
    const timer2 = setTimeout(() => setStep(2), 5500);
    const timer3 = setTimeout(() => setStep(3), 8500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center p-6 transition-opacity duration-1000">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.028%22/%3E%3C/svg%3E')] pointer-events-none opacity-50 mix-blend-overlay"></div>
      
      <div className="max-w-[400px] w-full flex flex-col items-center justify-center min-h-[50vh] relative z-10 text-center">
        {step === 0 && (
          <div className="animate-[noteIn_1s_ease-out_both] flex flex-col items-center justify-center">
             <img src="/logo.png" alt="Stik Logo" className="w-[300px] md:w-[360px] h-auto drop-shadow-2xl" />
          </div>
        )}

        {step === 1 && (
          <div className="font-nanum text-2xl md:text-3xl text-text leading-[1.6] animate-[noteIn_1.5s_ease-out_both] mb-12">
            함께 매점을 향해 뛰던 쉬는 시간,<br/>
            분필 가루 날리던 왁자지껄한 교실.
          </div>
        )}
        
        {step === 2 && (
          <div className="font-nanum text-2xl md:text-3xl text-text leading-[1.6] animate-[noteIn_1.5s_ease-out_both] mb-16">
            이름은 가물가물해도<br/>
            문득 그리워지는 그 시절 우리들.
          </div>
        )}

        {step >= 3 && (
          <div className="w-full animate-[vIn_1s_ease_both]">
            <p className="text-[13px] text-muted2 leading-[1.8] mb-8 font-dodum">
              당신의 기억을 어둠 속 벽에 남겨두세요.<br/>
              언젠가, 반드시 닿을 것입니다.
            </p>
            <button 
              onClick={onComplete}
              className="w-full bg-gold text-[#0c0a07] py-4 rounded-none font-nanum text-[15px] font-extrabold hover:bg-gold2 transition-all flex items-center justify-center gap-2 "
            >
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>
              내 추억의 학교 찾기
            </button>
            <div className="mt-4 text-[10px] tracking-[0.1em] text-muted text-center uppercase">
              익명 보장 · 언제든 삭제 가능
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
