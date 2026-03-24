"use client";

export function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: 'v1', icon: '🏮', label: '학교' },
    { id: 'v5', icon: '📚', label: '학원' },
    { id: 'v2', icon: '🌡', label: '내 신호', temp: 35 },
    { id: 'v3', icon: '🧩', label: '기억' },
    { id: 'v4', icon: '⏳', label: '만료' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bg/95 backdrop-blur-md border-t border-border2 z-40 pb-safe">
      <div className="flex justify-around py-2">
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`flex flex-col items-center gap-1 p-1.5 cursor-pointer min-w-[52px] transition-opacity active:opacity-60 ${activeTab === t.id ? 'on' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            <div className={`text-xl leading-none relative ${activeTab === t.id ? 'drop-shadow-[0_0_4px_rgba(201,169,110,0.6)]' : ''}`}>
              {t.icon}
              {t.temp && (
                <div className="absolute -top-1 -right-1 bg-warm text-[#0c0a07] text-[8px] font-extrabold px-1 rounded-full min-w-[20px] text-center">
                  {t.temp}°
                </div>
              )}
            </div>
            <div className={`text-[9px] tracking-wider whitespace-nowrap transition-colors ${activeTab === t.id ? 'text-gold' : 'text-muted'}`}>
              {t.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
