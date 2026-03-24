"use client";

import { useState } from "react";

export function MatchModals({ step, setStep }: { step: number, setStep: (v: number) => void }) {
  const [greetText, setGreetText] = useState("");
  const chips = ['"혹시 기억하시나요?"', '"그 시절이 생각나서요."', '"안녕하세요, 반갑습니다."', '"이렇게 연결될 줄 몰랐어요."'];

  if (step === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/85 z-[800] flex items-center justify-center backdrop-blur-md">
      {/* STEP 1: 신호 감지 */}
      {step === 1 && (
        <div className="bg-s2 border border-[rgba(201,169,110,0.28)] p-12 max-w-[420px] w-11/12 text-center shadow-[0_32px_100px_rgba(0,0,0,0.9)] animate-[mIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="w-[84px] h-[84px] rounded-full mx-auto mb-5 bg-[radial-gradient(circle,rgba(201,169,110,0.25)_0%,transparent_70%)] flex items-center justify-center text-[34px] relative animate-[burstG_2s_infinite]">
            <div className="absolute inset-[-12px] rounded-full border border-gold/20 animate-[burstR_2.4s_infinite]"></div>
            <div className="absolute inset-[-24px] rounded-full border border-gold/20 animate-[burstR_2.4s_infinite] delay-700"></div>
            ✦
          </div>
          <div className="font-nanum text-2xl font-extrabold text-gold mb-2.5">신호가 닿았습니다</div>
          <p className="text-[13px] text-muted2 leading-[1.9] mb-6">
            서울중학교 1998년 2학년,<br/>
            같은 공간에 있었던 누군가가<br/>
            지금 이 벽에 있습니다.<br/><br/>
            <span className="text-gold">연결하시겠습니까?<br/>양쪽 모두 동의해야 연결됩니다.</span>
          </p>
          <div className="flex gap-2.5">
            <button className="flex-1 bg-gold text-[#0c0a07] p-3 font-nanum text-[13px] font-extrabold hover:bg-gold2 transition-colors" onClick={() => setStep(2)}>연결하기</button>
            <button className="flex-1 bg-transparent text-muted border border-border2 p-3 font-nanum text-[13px] hover:text-text transition-colors" onClick={() => setStep(0)}>나중에</button>
          </div>
        </div>
      )}

      {/* STEP 2: 익명 첫 인사 작성 */}
      {step === 2 && (
        <div className="bg-s2 border border-[rgba(201,169,110,0.28)] px-10 py-12 max-w-[460px] w-11/12 text-center shadow-[0_32px_100px_rgba(0,0,0,0.9)] animate-[mIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted mb-4">익명 첫 인사 · STEP 2/3</div>
          <div className="font-nanum text-xl font-extrabold text-text mb-2">첫 인사를 보내보세요</div>
          <p className="text-[12.5px] text-muted2 leading-[1.8] mb-5">
            이름은 공개되지 않습니다.<br/>상대방이 응답하면 그때 서로 선택할 수 있어요.
          </p>
          
          <div className="flex gap-2 flex-wrap mb-3.5 justify-center">
            {chips.map(chip => (
              <div 
                key={chip} 
                className={`px-3 py-1.5 border text-xs cursor-pointer transition-all font-nanum ${greetText === chip ? 'bg-gold-dim border-gold/35 text-gold' : 'bg-s2 border-border2 text-muted2 hover:bg-s3 hover:text-text'}`}
                onClick={() => setGreetText(chip)}
              >{chip}</div>
            ))}
          </div>

          <textarea 
            className="w-full bg-s3 border border-border2 p-3 font-nanum text-sm text-text resize-none h-[90px] outline-none leading-[1.7] mb-1.5"
            placeholder="직접 첫 인사를 써보세요..."
            maxLength={80}
            value={greetText}
            onChange={(e) => setGreetText(e.target.value)}
          ></textarea>
          <div className="text-right text-[10px] text-muted mb-4">
            <span className="text-gold">{greetText.length}</span>/80
          </div>
          
          <div className="bg-[#4ade80]/5 border border-[#4ade80]/10 p-2.5 mb-4 flex items-start gap-2 text-left">
            <div className="text-[#4ade80] text-sm shrink-0">✦</div>
            <div className="text-[11.5px] text-[#4ade80]/70 leading-[1.65]">
              첫 인사는 <strong>완전 익명</strong>으로 전달됩니다.<br/>
              상대방이 응답을 선택해야만 다음 단계로 넘어가요.
            </div>
          </div>

          <div className="flex gap-2.5">
            <button className="flex-1 bg-gold text-[#0c0a07] p-3 font-nanum text-[13px] font-extrabold hover:bg-gold2 transition-colors" onClick={() => setStep(3)}>인사 보내기</button>
            <button className="flex-1 bg-transparent text-muted border border-border2 p-3 font-nanum text-[13px] hover:text-text transition-colors" onClick={() => setStep(1)}>← 뒤로</button>
          </div>
        </div>
      )}

      {/* STEP 3: 대기 화면 */}
      {step === 3 && (
        <div className="bg-s2 border border-[rgba(201,169,110,0.28)] px-10 py-12 max-w-[440px] w-11/12 text-center shadow-[0_32px_100px_rgba(0,0,0,0.9)] animate-[mIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted mb-4">인사 전송 완료 · STEP 3/3</div>
          
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-gold/40 animate-[waitRing_2s_infinite_0s]"></div>
            <div className="absolute inset-0 rounded-full border-[1.5px] border-gold/30 animate-[waitRing_2s_infinite_0.5s]"></div>
            <div className="absolute inset-0 rounded-full border-[1.5px] border-gold/20 animate-[waitRing_2s_infinite_1s]"></div>
            <div className="absolute inset-2/4 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gold flex items-center justify-center text-xs text-[#0c0a07]">✦</div>
          </div>

          <div className="font-nanum text-xl font-extrabold text-gold mb-2.5">인사가 전달됐습니다</div>
          <p className="text-[13px] text-muted2 leading-[1.9] mb-5">
            상대방이 응답하면 알림을 드립니다.<br/>
            조급해하지 않아도 괜찮아요 —<br/>
            <span className="text-text">그 사람도 지금 설레고 있을 수 있어요.</span>
          </p>

          <div className="bg-s2 border border-border2 p-4 mb-4 text-left">
            <div className="flex justify-between items-center mb-2.5">
              <div className="text-[11px] text-muted tracking-[0.1em] uppercase">응답 대기 중</div>
              <div className="flex items-center gap-1 text-[10px] text-warm">
                <div className="w-1 h-1 rounded-full bg-warm animate-pulse"></div>전송됨
              </div>
            </div>
            <div className="font-nanum text-[13px] text-text italic px-3 py-2 bg-white/5 border-l-2 border-gold/30">
              {greetText || '"그 시절이 생각나서요."'}
            </div>
            <div className="mt-2.5 h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold to-gold2 rounded-full animate-[waitProgress_8s_ease_infinite]"></div>
            </div>
            <div className="text-[10px] text-muted mt-1.5 text-center">보통 몇 시간 ~ 며칠 내 응답이 옵니다</div>
          </div>

          <button className="w-full bg-gold text-[#0c0a07] p-3 font-nanum text-[13px] font-extrabold shadow-none hover:bg-gold2" onClick={() => setStep(0)}>확인, 기다릴게요</button>
        </div>
      )}
    </div>
  );
}
