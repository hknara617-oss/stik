"use client";

export function Countdown() {
  const daysLeft = 25;
  const urg = daysLeft > 14 ? 0 : daysLeft > 6 ? 1 : daysLeft > 2 ? 2 : 3;

  return (
    <div className="animate-[vIn_0.28s_ease]">
      <div className="px-5 py-12 md:px-10 md:py-12 border-b border-border text-center relative overflow-hidden bg-bg">
        <div className="flex justify-center mb-7">
          <div className="flex flex-col items-center px-4 relative after:content-[':'] after:absolute after:-right-1 after:top-2 after:font-nanum after:text-[44px] after:font-extrabold after:text-muted after:animate-[blink_1s_step-end_infinite]">
            <div className="font-nanum text-[clamp(48px,7.5vw,80px)] font-extrabold leading-none transition-colors duration-500 text-gold">{daysLeft}</div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-muted mt-1.5">일</div>
          </div>
          <div className="flex flex-col items-center px-4 relative after:content-[':'] after:absolute after:-right-1 after:top-2 after:font-nanum after:text-[44px] after:font-extrabold after:text-muted after:animate-[blink_1s_step-end_infinite]">
            <div className="font-nanum text-[clamp(48px,7.5vw,80px)] font-extrabold leading-none transition-colors duration-500 text-gold">14</div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-muted mt-1.5">시간</div>
          </div>
          <div className="flex flex-col items-center px-4 relative after:content-[':'] after:absolute after:-right-1 after:top-2 after:font-nanum after:text-[44px] after:font-extrabold after:text-muted after:animate-[blink_1s_step-end_infinite]">
            <div className="font-nanum text-[clamp(48px,7.5vw,80px)] font-extrabold leading-none transition-colors duration-500 text-gold">32</div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-muted mt-1.5">분</div>
          </div>
          <div className="flex flex-col items-center px-4 relative">
            <div className="font-nanum text-[clamp(48px,7.5vw,80px)] font-extrabold leading-none transition-colors duration-500 text-gold">47</div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-muted mt-1.5">초</div>
          </div>
        </div>
        
        <div className="font-nanum text-[clamp(18px,2.8vw,26px)] font-extrabold text-text mb-2.5">신호가 살아있습니다</div>
        <div className="text-[13px] text-muted2 leading-[1.85] max-w-[420px] mx-auto mb-6">아직 25일의 시간이 남아있어요. 매일 기억 조각에 참여하면 온도가 올라가고 신호가 닿을 확률이 높아집니다.</div>
        
        <div className="flex gap-px max-w-[520px] mx-auto bg-border border border-border flex-wrap md:flex-nowrap">
          <div className={`flex-1 p-3 text-center transition-all duration-500 ${urg === 0 ? 'bg-s2 opacity-100' : 'bg-s1 opacity-30'}`}>
            <div className="text-base mb-1">🟢</div>
            <div className="font-nanum text-xs font-bold text-text mb-0.5">30–15일</div>
            <div className="text-[9px] text-muted tracking-[0.06em]">여유</div>
          </div>
          <div className={`flex-1 p-3 text-center transition-all duration-500 ${urg === 1 ? 'bg-s2 opacity-100' : 'bg-s1 opacity-30'}`}>
            <div className="text-base mb-1">🟡</div>
            <div className="font-nanum text-xs font-bold text-text mb-0.5">14–7일</div>
            <div className="text-[9px] text-muted tracking-[0.06em]">주의</div>
          </div>
          <div className={`flex-1 p-3 text-center transition-all duration-500 ${urg === 2 ? 'bg-s2 opacity-100' : 'bg-s1 opacity-30'}`}>
            <div className="text-base mb-1">🟠</div>
            <div className="font-nanum text-xs font-bold text-text mb-0.5">6–3일</div>
            <div className="text-[9px] text-muted tracking-[0.06em]">긴박</div>
          </div>
          <div className={`flex-1 p-3 text-center transition-all duration-500 ${urg === 3 ? 'bg-s2 opacity-100' : 'bg-s1 opacity-30'}`}>
            <div className="text-base mb-1">🔴</div>
            <div className="font-nanum text-xs font-bold text-text mb-0.5">2–0일</div>
            <div className="text-[9px] text-muted tracking-[0.06em]">마지막</div>
          </div>
        </div>
      </div>

      <div className="my-6 mx-5 md:mx-10 bg-red-500/5 border border-red-500/10 p-5 flex gap-3 items-start">
        <div className="text-lg shrink-0">⚠️</div>
        <div>
          <div className="font-nanum text-sm font-bold text-red-400 mb-1">만료되면 사라집니다</div>
          <div className="text-xs text-muted2 leading-[1.7]">90일이 지나면 이 신호는 이 벽에서 조용히 사라집니다. 그 사람이 그 이후에 이 벽에 와도 — 당신의 신호는 없어요. 기억 조각에 참여하면 온도가 올라가고 매칭 확률이 높아집니다.</div>
        </div>
      </div>

      <div className="px-5 py-5 md:px-10 border-t border-border flex gap-3 items-center flex-wrap bg-bg">
        <div className="flex-1 min-w-[200px]">
          <div className="font-nanum text-sm font-bold mb-1">신호를 90일 연장하기</div>
          <div className="text-[11.5px] text-muted2 leading-[1.6]">기억 조각 10회 참여 시 무료 연장<br/>또는 지금 바로 연장 가능합니다</div>
        </div>
        <button className="bg-gold text-[#0c0a07] px-6 py-3 font-nanum text-[13px] font-extrabold hover:bg-gold2 transition-colors whitespace-nowrap" onClick={() => alert("90일 연장 로직 실행")}>무료 연장 (기억 조각 10회)</button>
        <button className="bg-transparent text-muted2 border border-border2 px-5 py-3 font-nanum text-[13px] hover:text-text transition-colors whitespace-nowrap" onClick={() => alert("바로 연장 기능")}>바로 연장</button>
      </div>
    </div>
  );
}
