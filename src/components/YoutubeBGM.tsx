"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YoutubeBGM({ videoId = "s7X3Yicm3yI" }: { videoId?: string }) { 
  // Default videoId is set to a famous Cyworld/2000s 감성 BGM Mix as a placeholder.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Prevent loading multiple scripts if already there
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: videoId, // Required for loop in YT API
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        },
      });
    };

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, [videoId]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className={`fixed bottom-[85px] md:bottom-6 right-4 z-[90] transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hidden Player */}
      <div id="youtube-player" className="absolute opacity-0 pointer-events-none hidden"></div>
      
      {/* Custom Floating Cassette UI */}
      <button 
        onClick={togglePlay}
        className={`flex items-center gap-2.5 px-3 py-2 bg-s1/90 backdrop-blur-md border ${isPlaying ? 'border-gold shadow-[0_0_15px_rgba(201,169,110,0.25)]' : 'border-border2'} rounded-full transition-all group hover:bg-s2`}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-black border border-white/10 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-gold/90 shadow-[0_0_4px_rgba(201,169,110,0.8)]"></div>
          {/* subtle vinyl record grooves */}
          <div className="absolute inset-1 border border-white/5 rounded-full"></div>
          <div className="absolute inset-0.5 border border-white/5 rounded-full"></div>
        </div>
        <div className="flex flex-col items-start mr-2">
          <div className="text-[7.5px] tracking-[0.2em] font-dodum uppercase text-muted leading-none mb-0.5">BGM</div>
          <div className={`text-[10.5px] font-bold ${isPlaying ? 'text-[#e8c87a]' : 'text-muted2'} transition-colors font-nanum`}>
            {isPlaying ? '재생 중...' : '추억의 플리 재생'}
          </div>
        </div>
      </button>
    </div>
  );
}
