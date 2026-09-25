"use client";
import SafeImage from './SafeImage';

export default function AirdropSection() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-[18px] lg:text-[20px] tracking-tight flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-[#7717ff] flex items-center justify-center shadow-[0_0_15px_rgba(119,23,255,0.4)]">
            <span className="text-white font-black text-[12px]">S</span>
          </div>
          SHFL Airdrop 3
        </h2>
        <a href="/airdrop" className="text-[#8b8ba7] hover:text-white text-[13px] font-medium px-3 py-1.5 rounded-full hover:bg-[#14141f] transition-colors">View more</a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 lg:gap-4">
        {/* Main */}
        <div className="relative h-[260px] lg:h-[320px] rounded-[14px] lg:rounded-[16px] overflow-hidden bg-[#14141f] border border-[#1e1e2e] group hover:border-[#2a2a3e] transition-colors">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a27] via-[#14141f] to-[#0e0e15]" />
            <div className="absolute inset-0 opacity-40">
              <SafeImage image="/images/banners/airdrop-hero.png" alt="Airdrop" className="w-full h-full" fallbackType="promotion" />
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-[#0e0e15]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e15]/80 via-transparent to-transparent" />
          
          <div className="relative z-10 p-5 lg:p-7 h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1a1a27]/80 backdrop-blur border border-[#2a2a3e] rounded-full px-3 py-1 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-[11px] font-bold tracking-wide">LIVE NOW</span>
                <span className="text-[#8b8ba7] text-[11px]">•</span>
                <span className="text-[#8b8ba7] text-[11px]">Ends in 3d 12h</span>
              </div>
              
              <h3 className="text-white text-[24px] lg:text-[30px] font-black tracking-tight leading-[0.9] mb-2">
                $1M WEEKLY<br />
                <span className="text-[#7717ff]">AIRDROP</span>
              </h3>
              <p className="text-[#8b8ba7] text-[13px] leading-[1.4] max-w-[280px] font-medium">
                Wager, earn points, and climb the leaderboard for SHFL rewards every week.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#1e1e2e] border-2 border-[#0e0e15] flex items-center justify-center text-[10px] font-bold text-white">
                    {String.fromCharCode(64+i)}
                  </div>
                ))}
              </div>
              <span className="text-[#8b8ba7] text-[12px]">2.4k players joined</span>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7717ff]/20 rounded-full blur-[40px] group-hover:bg-[#7717ff]/30 transition-colors" />
        </div>

        {/* Leaderboard */}
        <div className="bg-[#14141f] border border-[#1e1e2e] rounded-[14px] lg:rounded-[16px] p-4 lg:p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-bold text-[14px] tracking-tight">Leaderboard</h4>
            <span className="text-[#5a5a7a] text-[11px] font-medium">Top 5</span>
          </div>
          
          <div className="space-y-2.5 flex-1">
            {[
              { rank: 1, name: 'CryptoWhale', pts: 12450, color: '#ffd700' },
              { rank: 2, name: 'DiamondHands', pts: 11230, color: '#c0c0c0' },
              { rank: 3, name: 'MoonBoi', pts: 9870, color: '#cd7f32' },
              { rank: 4, name: 'ShuffleKing', pts: 8540, color: '#5a5a7a' },
              { rank: 5, name: 'LuckyShot', pts: 7320, color: '#5a5a7a' },
            ].map((player) => (
              <div key={player.rank} className="group flex items-center gap-3 p-2 rounded-[10px] hover:bg-[#1a1a27] transition-colors cursor-pointer">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className={`text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                    player.rank <=3 ? 'text-black' : 'text-[#5a5a7a] bg-[#1e1e2e]'
                  }`} style={{ backgroundColor: player.rank <=3 ? player.color : undefined }}>
                    {player.rank}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-[#2a2a3e] flex items-center justify-center text-[10px] font-bold text-white group-hover:border-[#3a3a4e] transition-colors">
                    {player.name[0]}
                  </div>
                  <span className="text-white text-[12px] font-medium truncate tracking-tight">{player.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block w-16 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                    <div className="h-full bg-[#7717ff] rounded-full" style={{ width: `${100 - player.rank*12}%` }} />
                  </div>
                  <span className="text-white text-[11px] font-bold">{player.pts.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 h-[40px] bg-[#7717ff] text-white rounded-full text-[13px] font-bold hover:bg-[#8b3dff] transition-colors shadow-[0_0_20px_rgba(119,23,255,0.3)]">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </section>
  );
}
