"use client";

import { useState } from "react";
import { findOrCreateSchoolWall, getWallSignals } from "@/app/actions/wallActions";
import { createStik, reportStik } from "@/app/actions/stikActions";
import { useAuth } from "@/lib/useAuth";

export function SchoolWall() {
  const { deviceId } = useAuth();
  const [wallId, setWallId] = useState<string | null>(null);
  const [searchState, setSearchState] = useState<{name: string, year: string, grade: string} | null>(null);
  const [notes, setNotes] = useState<{id: string, t: string, c: string, r: number, f: string, isBlinded?: boolean}[]>([]); // We will hold fetched notes here
  const [schoolInput, setSchoolInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [gradeInput, setGradeInput] = useState("");

  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#fef08a");
  const [showContactModal, setShowContactModal] = useState(false);
  const colors = ["#fef08a", "#fde68a", "#fed7aa", "#fecaca", "#d9f99d", "#bfdbfe", "#e9d5ff"];

  const doSearch = async () => {
    if (!schoolInput.trim()) return alert("학교 이름을 입력해주세요.");
    if (yearInput && yearInput.length !== 4) return alert("연도 4자리를 입력해주세요.");
    
    const yearVal = parseInt(yearInput) || 1998;
    const gradeVal = gradeInput || "전체 학년";
    
    const { success, wall, error } = await findOrCreateSchoolWall(schoolInput, yearVal, gradeVal);
    
    if (success && wall) {
      setSearchState({
        name: wall.name,
        year: wall.year.toString(),
        grade: wall.grade
      });
      setWallId(wall.id);
      
      const { signals } = await getWallSignals(wall.id);
      if (signals) {
        setNotes(signals.map((s: { id: string, message: string, color: string, is_blinded: boolean }) => ({ 
          id: s.id,
          t: s.message, 
          c: s.color, 
          r: (Math.random() - 0.5) * 5, 
          f: 'var(--font-dodum)',
          isBlinded: s.is_blinded
        })));
      }
    } else {
      alert("벽을 찾거나 생성하는데 실패했습니다: " + error);
    }
  };

  const sendNote = async () => {
    if (!noteText.trim()) return alert("메시지를 써주세요.");
    if (!searchState || !wallId) return alert("먼저 학급 벽을 검색해주세요.");
    if (!deviceId) return alert("기기 식별자를 찾을 수 없습니다.");
    
    const { success, error, signal } = await createStik(wallId, deviceId, noteText, selectedColor);
    
    if (!success) {
      return alert(error || "신호를 남기지 못했습니다.");
    }
    
    const newNote = {
      id: signal.id,
      t: noteText,
      c: selectedColor,
      r: (Math.random() - 0.5) * 5,
      f: Math.random() > 0.5 ? 'var(--font-nanum)' : 'var(--font-dodum)',
      isBlinded: false
    };
    
    setNotes([newNote, ...notes]);
    setNoteText("");
    setShowContactModal(true);
  };

  return (
    <div className="animate-[vIn_0.28s_ease]">
      {/* HEADER */}
      <div className="px-5 py-9 md:px-10 md:py-12 border-b border-border relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(201,169,110,0.05)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center">
            <span className="text-gold text-xs">✦</span>
          </div>
          <div className="font-nanum text-[10px] tracking-[0.42em] uppercase text-gold">Stik · 2026</div>
        </div>
        <h1 className="font-nanum text-3xl md:text-5xl font-extrabold leading-[1.08] text-text mb-3.5">
          그 시절 우리들,<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px var(--gold)' }}>그때 닿지 못한 말들</span>
        </h1>
        <p className="text-[13.5px] text-muted2 leading-[1.85] max-w-[460px] mb-5">
          이름도 연락처도 모르지만 — 같은 교실에 있었던 당신에게.<br/>
          포스트잇 하나를 어둠 속 벽에 붙입니다. 언젠가 닿을 수도 있어요.
        </p>

        <div className="flex gap-2 mt-5 mb-1 flex-wrap">
          {[
            { step: 1, text: "학교 이름 입력" },
            { step: 2, text: "포스트잇 붙이기" },
            { step: 3, text: "그 사람 오면 알림" }
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-2 bg-s2 border border-border2 px-3.5 py-2">
              <span className="bg-gold text-[#0c0a07] text-[10px] font-extrabold px-[7px] py-[2px] font-nanum">{item.step}</span>
              <span className="text-xs text-muted2">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 bg-[#4ade80]/5 border border-[#4ade80]/15 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-[#4ade80] mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_5px_rgba(74,222,128,0.5)] animate-pulse"></div>
          지금 이 순간도 누군가 신호를 보내고 있습니다
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
        {[
          { num: "4,312", label: "신호 대기 중" },
          { num: "287", label: "연결 성사" },
          { num: "63", label: "오늘 신호" },
          { num: "12,394", label: "등록 학교" }
        ].map((stat, i) => (
          <div key={i} className="px-7 py-5 lg:border-r border-border last:border-0 border-b lg:border-b-0">
            <div className="font-nanum text-2xl font-extrabold text-text mb-1">
              {stat.num.split(',').map((part, pidx, arr) => (
                <span key={pidx}>{part}{pidx < arr.length - 1 && <span className="text-gold">,</span>}</span>
              ))}
            </div>
            <div className="text-[9.5px] tracking-[0.16em] uppercase text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="px-5 py-6 md:px-10 border-b border-border bg-[rgba(255,255,255,0.012)]">
        <div className="flex gap-2.5 flex-wrap items-end">
          <div className="flex flex-col gap-1 flex-[1.4] min-w-[200px]">
            <label className="text-[9.5px] tracking-[0.15em] uppercase text-muted">학교 이름</label>
            <input 
              type="text" 
              placeholder="예) 서울초등학교, 강남중학교"
              value={schoolInput}
              onChange={(e) => setSchoolInput(e.target.value)}
              className="bg-s2 border border-border2 px-3.5 py-2.5 font-dodum text-[13px] text-text outline-none focus:border-gold/40 focus:bg-s3 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1 w-[128px]">
            <label className="text-[9.5px] tracking-[0.15em] uppercase text-muted">졸업 연도</label>
            <input 
              type="text" 
              placeholder="1998" 
              maxLength={4}
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value.replace(/[^0-9]/g, ''))}
              className="bg-s2 border border-border2 px-3.5 py-2.5 font-dodum text-[13px] text-text outline-none focus:border-gold/40 focus:bg-s3 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1 w-[128px]">
            <label className="text-[9.5px] tracking-[0.15em] uppercase text-muted">학년</label>
            <select 
              value={gradeInput}
              onChange={(e) => setGradeInput(e.target.value)}
              className="bg-s2 border border-border2 px-3.5 py-2.5 font-dodum text-[13px] text-text outline-none focus:border-gold/40 focus:bg-s3 transition-colors"
            >
              <option value="">— 선택 —</option>
              <option>1학년</option>
              <option>2학년</option>
              <option>3학년</option>
              <option>4학년</option>
              <option>5학년</option>
              <option>6학년</option>
            </select>
          </div>
          <button 
            onClick={doSearch}
            className="bg-gold text-[#0c0a07] px-6 py-[11px] font-nanum text-[13px] font-extrabold hover:bg-gold2 hover:-translate-y-[1px] transition-all ml-auto md:ml-0 w-full md:w-auto mt-2 md:mt-0"
          >
            이 벽 찾기
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      {searchState ? (
        <div className="md:grid md:grid-cols-[1fr_340px] min-h-[560px]">
          {/* WALL */}
          <div className="md:border-r border-border border-b md:border-b-0">
            <div className="px-5 py-4 md:px-7 border-b border-border flex justify-between items-center bg-s1">
              <div className="font-nanum text-sm font-bold">
                {searchState.name} · {searchState.year}년 · {searchState.grade}
              </div>
              <div className="text-[11px] text-muted flex items-center gap-2 hidden md:flex">
                포스트잇 {notes.length}개
                <button 
                  onClick={() => { navigator.clipboard.writeText(window.location.href); alert("이 벽의 링크가 복사되었습니다!"); }}
                  className="ml-2 inline-flex items-center gap-1.5 bg-s2 border border-border2 px-2 py-0.5 text-[9.5px] cursor-pointer hover:bg-s3 transition-colors text-text"
                >
                  🔗 이 벽 공유하기
                </button>
              </div>
            </div>
            
            <div className="wv-wall overflow-hidden relative">
              <div className="flex flex-wrap gap-3.5 content-start">
                {notes.map((n, i) => (
                  <div key={i} className="note" style={{ background: n.c, transform: `rotate(${n.r}deg)`, animationDelay: `${i*0.038}s` }}>
                    <div className="text-[8.5px] tracking-[0.1em] uppercase text-[rgba(26,20,16,0.38)] mb-1.5">{searchState.name.substring(0,4)} · {searchState.grade}</div>
                    <div className="text-[12.5px] leading-[1.68] text-[rgba(26,20,16,0.87)] break-keep" style={{ fontFamily: n.f }}>{n.t}</div>
                    <div className="note-fold"></div>
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-center">
                      <div className="text-[9.5px] text-[rgba(26,20,16,0.32)] font-nanum">&apos;{searchState.year.substring(2)}</div>
                      <div className="w-2 h-2 rounded-full bg-[rgba(26,20,16,0.15)]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WRITE PANEL */}
          <div className="flex flex-col bg-s1">
            <div className="px-5 py-4 md:px-5 border-b border-border flex justify-between items-center">
              <div className="font-nanum text-sm font-bold">신호 보내기</div>
              <div className="text-[10px] text-muted">익명 · 무료</div>
            </div>
            <div className="p-5 flex-1">
              <div className="text-xs text-muted2 leading-[1.8] mb-4 px-3 py-2.5 bg-gold-dim border-l-2 border-gold/35">
                메시지는 익명으로 이 벽에 붙습니다.<br/>
                그 사람이 같은 벽에 오면 — 닿을 수도 있어요.
              </div>
              
              <div className="flex gap-1.5 mb-3">
                {colors.map(c => (
                  <div 
                    key={c} 
                    className={`w-[23px] h-[23px] rounded-full cursor-pointer transition-transform border-2 border-transparent hover:scale-125 ${selectedColor === c ? 'border-gold shadow-[0_0_0_3px_rgba(201,169,110,0.2)] scale-110 !border-2' : ''}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(c)}
                  ></div>
                ))}
              </div>

              <div className="preview" style={{ background: selectedColor }}>
                <textarea 
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="그때 하지 못했던 말을 써주세요&#10;&#10;'창가 자리에 앉았던 너,&#10;아직도 생각나'"
                  maxLength={100}
                  className="w-full h-full bg-transparent border-none outline-none font-nanum text-sm leading-[1.8] text-[rgba(26,20,16,0.87)] resize-none"
                ></textarea>
                <div className="preview-fold"></div>
              </div>
              
              <div className="flex justify-end mb-2.5 text-[10px] text-muted">
                <span className="text-gold">{noteText.length}</span>/100
              </div>

              <div className="flex flex-col gap-2 mb-3">
                <input className="bg-s2 border border-border2 px-3 py-2 font-dodum text-[12.5px] text-text outline-none focus:border-gold/35 focus:bg-s3 placeholder:text-muted" type="text" placeholder="그 사람의 특징 힌트 (선택)" />
              </div>

              <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-[#4ade80]/5 border border-[#4ade80]/10">
                <div className="text-[11.5px] text-[#4ade80]/70 flex-1 leading-relaxed">✦ 완전 익명 보장 — 이름·연락처 수집 없음</div>
                <div className="w-[37px] h-5 bg-[#4ade80] rounded-full relative shrink-0">
                  <div className="absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] left-[3px] translate-x-[17px] shadow-sm"></div>
                </div>
              </div>

              <button 
                onClick={sendNote}
                className="w-full bg-gold text-[#0c0a07] p-3 font-nanum text-sm font-extrabold hover:bg-gold2 hover:-translate-y-[1px] transition-all relative overflow-hidden"
              >
                이 벽에 붙이기
              </button>
              <p className="mt-2 text-[10px] text-muted text-center leading-[1.6]">
                90일 후 미매칭 신호는 자동 삭제됩니다<br/>
                상대방이 같은 벽에 오면 알림드립니다
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[560px] flex items-center justify-center flex-col text-muted2 py-20">
          <div className="text-4xl mb-4 opacity-50">🏮</div>
          <div className="font-nanum text-lg text-text mb-2">벽을 검색해주세요</div>
          <p className="text-sm text-center">학교 이름과 졸업 연도를 입력하여<br/>추억의 벽을 찾아보세요.</p>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-[vIn_0.3s_ease]">
          <div className="w-full max-w-[420px] bg-s1 border border-border2 p-8 shadow-2xl relative">
            <button className="absolute top-4 right-5 text-muted hover:text-text text-xl" onClick={() => setShowContactModal(false)}>✕</button>
            <div className="text-4xl mb-4">💌</div>
            <div className="font-nanum text-xl font-bold mb-2">신호가 벽에 붙었습니다!</div>
            <p className="text-[13px] text-muted2 leading-[1.7] mb-6">
              누군가 이 벽에서 당신의 신호에 응답하면<br/>어디로 알림을 보내드릴까요? (선택)
            </p>
            <div className="flex flex-col gap-2.5 mb-5">
              <button className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#191919] font-bold text-[13px] p-3.5 hover:brightness-95 transition-all">
                <span>💬</span> 카카오톡으로 알림 받기
              </button>
              <button className="flex items-center justify-center gap-2 bg-s2 border border-border2 text-text text-[13px] p-3.5 hover:bg-s3 transition-all">
                <span>✉️</span> 이메일로 알림 받기
              </button>
            </div>
            <button className="w-full text-[11px] text-muted hover:text-text underline underline-offset-4" onClick={() => setShowContactModal(false)}>
              괜찮습니다. 제가 가끔 들어와서 확인할게요.
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
