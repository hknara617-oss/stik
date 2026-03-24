"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/useAuth";

export function MySignal() {
  const { deviceId } = useAuth();
  const [temp, setTemp] = useState(35);
  const [memCount, setMemCount] = useState(4);
  const [daysLeft, setDaysLeft] = useState(25);
  const [logs, setLogs] = useState<any[]>([
    { bc: 'var(--warm)', icon: '👀', bg: 'rgba(245,158,11,0.1)', color: 'var(--warm)', msg: '이 벽에 새로운 방문자가 왔습니다', sub: '서울중학교 · 1998년 2학년 · 온도 +12°', time: '방금 전', isNew: true },
    { bc: 'var(--gold)', icon: '🧩', bg: 'rgba(201,169,110,0.1)', color: 'var(--gold)', msg: '기억 조각 "떡볶이 집"에 반응이 달렸습니다', sub: '내 신호와 기억 겹침 감지 · 온도 +6°', time: '23분 전', isNew: true },
  ]);

  useEffect(() => {
    if (!deviceId) return;

    // Fetch initial signal for the device
    const fetchSignal = async () => {
      const { data } = await supabase
        .from('signals')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (data) {
        setTemp(data.temperature);
        // Calc days left based on expires_at
        const diff = new Date(data.expires_at).getTime() - new Date().getTime();
        setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 3600 * 24))));
      }
    };
    
    fetchSignal();

    // Subscribe to realtime updates for this device's signals
    const channel = supabase.channel('signal_updates')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'signals', filter: `device_id=eq.${deviceId}` }, 
        (payload) => {
          const newDoc = payload.new as any;
          if (newDoc && newDoc.temperature !== undefined) {
            setTemp(newDoc.temperature);
            // Add interaction log
            setLogs(prev => [{ bc: 'var(--hot)', icon: '🔥', bg: 'rgba(239,68,68,0.1)', color: 'var(--hot)', msg: '온도가 실시간으로 급상승했습니다', sub: `실시간 반영 · 현재 ${newDoc.temperature}°`, time: '방금 전', isNew: true }, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceId]);

  const heatUp = async () => {
    if (temp >= 100) return;
    const newTemp = Math.min(100, temp + 15);
    
    // Optimistic update
    setTemp(newTemp);
    
    // Update DB
    if (deviceId) {
      const { data } = await supabase.from('signals').select('id').eq('device_id', deviceId).limit(1).single();
      if (data) {
        await supabase.from('signals').update({ temperature: newTemp }).eq('id', data.id);
      }
    }
  };

  const getCfg = (t: number) => {
    if (t < 25) return { color: 'var(--cold)', st: '차가움 — 신호 대기 중', glow: 'rgba(107,158,196,0.04)' };
    if (t < 55) return { color: 'var(--warm)', st: '미지근함 — 누군가 이 벽에 있어요', glow: 'rgba(245,158,11,0.04)' };
    if (t < 80) return { color: 'var(--hot)', st: '뜨거움 — 신호 반응 감지', glow: 'rgba(239,68,68,0.05)' };
    return { color: 'var(--fire)', st: '🔥 점화 — 매칭 임박', glow: 'rgba(255,98,0,0.06)' };
  };

  const cfg = getCfg(temp);

  return (
    <div className="animate-[vIn_0.28s_ease]">
      <div className="px-5 py-11 md:px-10 md:py-11 border-b border-border relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full pointer-events-none transition-colors duration-1000 ease-in-out" style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 65%)` }}></div>
        <div className="text-[10.5px] tracking-[0.2em] uppercase text-muted mb-2">서울중학교 · 1998년 2학년</div>
        <div className="font-nanum text-[clamp(18px,3.2vw,30px)] font-bold text-text leading-[1.45] max-w-[560px] mb-3.5">
          "창가 자리에 앉았던 너,<br/>아직도 생각나"
        </div>
        <div className="text-xs text-muted">보낸 날: 2026년 3월 1일 · 만료까지 {daysLeft}일</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
        {/* 엔진 1: 신호 온도 */}
        <div className="bg-s1 p-5 transition-colors hover:bg-s2">
          <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cfg.color }}></div>신호 온도
          </div>
          <div className="font-nanum text-5xl font-extrabold leading-none mb-1.5 transition-colors duration-1000" style={{ color: cfg.color }}>
            {temp}<sup className="text-xl font-normal text-muted2 align-super">°</sup>
          </div>
          <div className="h-1 bg-white/5 rounded-full mb-2 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${temp}%`, background: cfg.color }}></div>
          </div>
          <div className="text-xs leading-relaxed transition-colors duration-1000" style={{ color: cfg.color }}>{cfg.st}</div>
          <div className="mt-2 text-[10px] text-muted leading-[1.6] px-2.5 py-1.5 bg-white/5 border-l-2 border-gold/20">
            100°에 가까울수록<br/>그 사람이 이 벽에 있을 가능성 ↑
          </div>
        </div>
        
        {/* 엔진 2: 만료까지 */}
        <div className="bg-s1 p-5 transition-colors hover:bg-s2">
          <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-[engpulse_2s_infinite]"></div>만료까지
          </div>
          <div className="flex items-end gap-1.5 mb-2">
            <div className="flex flex-col items-center gap-px">
              <div className="font-nanum text-3xl font-extrabold leading-none">{daysLeft}</div>
              <div className="text-[8px] tracking-[0.1em] uppercase text-muted">일</div>
            </div>
            <div className="font-nanum text-2xl text-muted mb-1 animate-[blink_1s_step-end_infinite]">:</div>
            <div className="flex flex-col items-center gap-px">
              <div className="font-nanum text-3xl font-extrabold leading-none">14</div>
              <div className="text-[8px] tracking-[0.1em] uppercase text-muted">시간</div>
            </div>
            <div className="font-nanum text-2xl text-muted mb-1 animate-[blink_1s_step-end_infinite]">:</div>
            <div className="flex flex-col items-center gap-px">
              <div className="font-nanum text-3xl font-extrabold leading-none">32</div>
              <div className="text-[8px] tracking-[0.1em] uppercase text-muted">분</div>
            </div>
          </div>
          <div className="h-[3px] bg-white/5 rounded-full mb-2 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-fire" style={{ width: '72%' }}></div>
          </div>
          <div className="text-[11.5px] text-muted2 leading-relaxed">신호가 살아있습니다<br/>아직 여유가 있어요</div>
        </div>

        {/* 엔진 3: 기억 조각 */}
        <div className="bg-s1 p-5 transition-colors hover:bg-s2">
          <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-[engpulse_2s_infinite]"></div>기억 조각 참여
          </div>
          <div className="font-nanum text-5xl font-extrabold leading-none text-gold mb-1.5">
            {memCount}<span className="text-lg font-normal text-muted2">회</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full mb-2 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold2" style={{ width: `${memCount * 10}%` }}></div>
          </div>
          <div className="text-[11.5px] text-muted2 leading-relaxed">
            기억 참여 → 신호 온도 연동<br/>오늘 +20° 획득
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="px-5 py-4 md:px-10 border-b border-border flex justify-between items-center bg-s1">
          <div className="font-nanum text-[13px] font-bold">신호 활동 로그</div>
          <div className="text-[10px] text-muted cursor-pointer hover:text-text transition-colors">모두 읽음</div>
        </div>
        <div className="max-h-[280px] overflow-y-auto log-list bg-bg">
          {temp >= 50 && (
            <div className="mx-5 my-4 p-4 border border-blue-500/30 bg-blue-500/5 animate-[vIn_0.5s_ease-out]">
              <div className="font-nanum text-sm font-bold text-blue-400 mb-1 flex items-center gap-2">
                🔒 신호 잃어버리지 않게 백업하기
              </div>
              <div className="text-xs text-muted2 leading-[1.7] mb-3">
                🔥 온도가 많이 올랐어요! 브라우저 캐시가 지워지거나 기기를 변경해도 신호를 계속 확인할 수 있도록 기존 소셜 계정과 연결해 두세요.
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#FEE500] text-[#191919] text-[11px] font-bold py-2 hover:brightness-95 transition-all text-center rounded-sm">
                  카카오 로그인
                </button>
                <button className="flex-1 bg-white text-black text-[11px] font-bold py-2 hover:bg-gray-100 transition-all text-center rounded-sm">
                  Apple로 계속하기
                </button>
              </div>
            </div>
          )}
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 md:px-10 border-b border-border border-l-2 hover:bg-s1 transition-colors animate-[logIn_0.35s_ease_both]" style={{ borderLeftColor: log.bc, animationDelay: `${i*0.05}s` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0" style={{ background: log.bg, color: log.color }}>{log.icon}</div>
              <div className="flex-1">
                <div className="font-nanum text-[13px] mb-0.5">{log.msg}</div>
                <div className="text-[11px] text-muted">{log.sub}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {log.isNew && <div className="text-[8px] tracking-[0.1em] bg-gold text-[#0c0a07] px-1.5 py-0.5 font-bold">NEW</div>}
                <div className="text-[10px] text-muted">{log.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 md:px-10 border-t border-border bg-s1 flex gap-2.5 items-center flex-wrap">
        <div className="text-[11px] text-muted flex-1 min-w-[180px]">현재 Supabase DB와 실시간 연결되어 있습니다.</div>
        <button className="bg-gold text-[#0c0a07] px-5 py-2.5 font-nanum text-xs font-extrabold hover:bg-gold2 transition-all hover:-translate-y-[1px]" onClick={heatUp}>
          🔥 온도 올리기
        </button>
      </div>
    </div>
  );
}
