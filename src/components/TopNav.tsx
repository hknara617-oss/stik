"use client";

import { useState } from "react";

export function TopNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const [temp] = useState(35); // Placeholder

  return (
    <nav className="px-5 py-4 md:px-10 md:py-4 border-b border-border flex justify-between items-center sticky top-0 bg-bg/95 backdrop-blur-md z-50">
      <div className="font-nanum text-xl md:text-2xl font-extrabold tracking-tight">
        Stik
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-0.5">
          <div className={`ntab ${activeTab === 'v1' ? 'on' : ''}`} onClick={() => setActiveTab('v1')}>🏮 학교 벽</div>
          <div className={`ntab ${activeTab === 'v5' ? 'on' : ''}`} onClick={() => setActiveTab('v5')}>📚 학원 벽</div>
          <div className={`ntab ${activeTab === 'v2' ? 'on' : ''}`} onClick={() => setActiveTab('v2')}>🌡 내 신호</div>
          <div className={`ntab ${activeTab === 'v3' ? 'on' : ''}`} onClick={() => setActiveTab('v3')}>🧩 기억 조각</div>
          <div className={`ntab ${activeTab === 'v4' ? 'on' : ''}`} onClick={() => setActiveTab('v4')}>⏳ 만료</div>
        </div>
        <div 
          className="flex items-center gap-2 bg-s2 border border-border2 px-3 py-1.5 text-[11px] text-muted2 cursor-pointer transition-colors hover:border-gold/30 hover:text-text"
          onClick={() => setActiveTab('v2')}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-warm animate-pulse shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div>
          <span>{temp}°</span>
        </div>
      </div>
      
      <style jsx>{`
        .ntab {
          padding: 6px 14px;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--muted);
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .ntab:hover { color: var(--text); }
        .ntab.on { color: var(--gold); border-color: var(--border2); background: var(--gold-dim); }
      `}</style>
    </nav>
  );
}
