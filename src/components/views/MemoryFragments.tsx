"use client";

import { useState } from "react";

export function MemoryFragments() {
  const [streak, setStreak] = useState(3);
  const [badges] = useState(["🌱"]);
  const [selChip, setSelChip] = useState("");
  const [inputText, setInputText] = useState("");
  const [memories, setMemories] = useState([
    { q: '오늘', qc: 'var(--gold)', t: '"학교 앞 오른쪽 떡볶이 아주머니 — 방과후엔 꼭 들렸어. 500원 컵 하나."', m: true, r: { h: 23, n: 15, e: 8 } },
    { q: '오늘', qc: 'var(--gold)', t: '"2반 교실 앞 문방구. 수업 끝나고 뽑기 하러 달려가던 거."', m: false, r: { h: 31, n: 22, e: 11 } },
    { q: '어제', qc: 'var(--cold)', t: '"체육복 바지가 줄무늬였던 거. 여름엔 땀이 엄청 찼어."', m: true, r: { h: 44, n: 38, e: 29 } },
    { q: '3일 전', qc: 'var(--muted)', t: '"급식 소시지 볶음... 지금도 그 맛이 그리워."', m: false, r: { h: 67, n: 51, e: 42 } },
  ]);

  const addMemory = () => {
    const v = inputText.trim() || selChip;
    if (!v) return alert('기억을 선택하거나 입력해주세요');

    const newMem = {
      q: '방금', qc: 'var(--gold)',
      t: `"${v} — 나도 기억나!"`,
      m: Math.random() > 0.4,
      r: { h: 1, n: 0, e: 0 }
    };

    setMemories([newMem, ...memories]);
    setInputText("");
    setSelChip("");
    setStreak(s => s + 1);
    alert('✦ 기억 조각 남김 · 온도 +5°');
  };

  return (
    <div className="animate-[vIn_0.28s_ease]">
      {/* 바 배지 */}
      <div className="px-5 py-3.5 md:px-10 bg-s1 border-b border-border flex items-center gap-4 flex-wrap">
        <div className="inline-flex items-center gap-1.5 bg-[rgba(255,98,0,0.1)] border border-[rgba(255,98,0,0.25)] px-2.5 py-1.5 text-[11px] text-fire font-nanum font-bold">
          🔥 {streak}일 연속 참여
        </div>
        <div className="text-[11px] text-muted">오늘도 기억 조각 남기면 스트릭 유지 +온도 상승</div>
        <div className="ml-auto flex items-center gap-2">
          <div className="text-[10px] text-muted">획득 배지</div>
          <div className="text-base tracking-[3px]">{badges.join(' ')}</div>
        </div>
      </div>

      <div className="bg-s1 px-5 py-8 md:px-10 border-b border-border">
        <div className="text-[9px] tracking-[0.24em] uppercase text-muted mb-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>오늘의 기억 질문 · DAY 13
        </div>
        <div className="font-nanum text-lg md:text-2xl font-bold text-text leading-relaxed mb-4 max-w-[600px]">
          &quot;그 시절 학교 앞에 자주 가던 곳이 있었나요?<br/>떡볶이 집, 문방구, 오락실... 뭐가 기억나요?&quot;
        </div>
        <div className="flex gap-2.5 flex-wrap mb-3">
          {['앞 떡볶이 집', '문방구', '편의점', '오락실', 'PC방'].map(chip => (
            <div 
              key={chip} 
              className={`px-3 py-1.5 border text-xs cursor-pointer transition-all ${selChip === chip ? 'bg-gold-dim border-gold/30 text-gold' : 'bg-s2 border-border2 text-muted2 hover:bg-s3 hover:text-text'}`}
              onClick={() => setSelChip(chip)}
            >
              {chip}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-s2 border border-border2 px-3 py-2.5 font-dodum text-[13px] text-text outline-none focus:border-gold/40" 
            placeholder="직접 입력..." 
            maxLength={30}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            className="bg-gold text-[#0c0a07] px-5 py-2.5 font-nanum text-xs font-extrabold hover:bg-gold2 transition-all whitespace-nowrap"
            onClick={addMemory}
          >
            기억 남기기 +5°
          </button>
        </div>
      </div>

      <div className="px-5 py-6 md:px-10 flex flex-col gap-[1px]">
        {memories.map((m, i) => (
          <div key={i} className="relative py-4 border-b border-border last:border-0 animate-[logIn_0.35s_ease_both] group" style={{ animationDelay: `${i*0.04}s` }}>
              {/* Share Button (Andrew Chen's Viral Loop) */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const text = `"${m.q}" - Stik에서 내 학창시절 기억 조각을 공유했어요. 함께 추억을 나누실래요?`;
                  if (navigator.share) {
                    navigator.share({ title: 'Stik 추억 조각', text, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(`${text} ${window.location.href}`);
                    alert('공유 링크가 클립보드에 복사되었습니다.');
                  }
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
              >
                <span className="text-[10px] text-muted2">🔗</span>
              </button>
              
            <div className="text-[9px] uppercase tracking-[0.2em] text-muted mb-2 font-dodum">Memory #{m.id}</div>
            <div className="text-[9px] tracking-[0.12em] uppercase text-muted mb-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.qc }}></div>{m.q}의 질문
            </div>
            <div className="font-nanum text-base font-bold text-text leading-relaxed mb-3 break-keep">{m.t}</div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="text-[11px] text-muted flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-s3 border border-border2 flex items-center justify-center text-[10px] text-muted2">익</div>익명
              </div>
              {m.m && (
                <div className="inline-flex items-center gap-1 bg-gold/5 border border-gold/20 px-2 py-0.5 text-[9.5px] text-gold">
                  ✦ 내 신호와 기억 겹침
                </div>
              )}
              <div className="ml-auto flex gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 bg-s2 border border-border text-[11px] text-muted cursor-pointer hover:bg-s3 hover:text-text">🥹 {m.r.h}</div>
                <div className="flex items-center gap-1 px-2 py-1 bg-s2 border border-border text-[11px] text-muted cursor-pointer hover:bg-s3 hover:text-text">✓ {m.r.n}</div>
                <div className="flex items-center gap-1 px-2 py-1 bg-s2 border border-border text-[11px] text-muted cursor-pointer hover:bg-s3 hover:text-text">나도 {m.r.e}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
