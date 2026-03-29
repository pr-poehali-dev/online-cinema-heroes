import { CHANNELS, CARTOONS } from "../data/cartoons";
import { type NavState } from "../App";
import Icon from "@/components/ui/icon";

interface ChannelsPageProps {
  navigate: (state: NavState) => void;
}

export default function ChannelsPage({ navigate }: ChannelsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📡</span>
          <h1 className="font-russo text-4xl text-white">ТВ-каналы</h1>
        </div>
        <p className="text-white/50 text-lg">Смотри любимые мультики прямо сейчас!</p>
      </div>

      {/* Channels grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHANNELS.map((ch) => {
          const cartoon = CARTOONS.find((c) => c.id === ch.cartoonId);
          return (
            <div
              key={ch.id}
              className="channel-card bg-card rounded-3xl overflow-hidden border border-white/10 transition-all duration-300"
            >
              {/* Banner */}
              <div
                className="relative h-40 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${ch.color}30, ${ch.color}10)` }}
              >
                <div className="absolute inset-0 stars-bg opacity-20" />
                <span className="relative text-8xl z-10">{ch.icon}</span>
                {ch.isLive && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-kidz-red px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
                    <span className="text-white text-xs font-russo">LIVE</span>
                  </div>
                )}
                {!ch.isLive && (
                  <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full">
                    <span className="text-white/60 text-xs font-bold">Скоро</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-russo text-2xl text-white mb-1">{ch.name}</h2>
                <p className="text-white/50 text-sm mb-4">{ch.description}</p>

                {/* Current playing */}
                <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Play" size={14} className="text-kidz-yellow" />
                    <span className="text-kidz-yellow text-xs font-bold uppercase tracking-wide">
                      {ch.isLive ? "Сейчас в эфире" : "Ожидается"}
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm">{ch.currentEpisode}</p>
                </div>

                {/* Episodes count */}
                {cartoon && (
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <Icon name="Film" size={14} />
                      {cartoon.totalEpisodes} серий
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {cartoon.years}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Star" size={14} />
                      {cartoon.ageRating}
                    </span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate({ page: "series", cartoonId: ch.cartoonId })}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105"
                    style={{
                      background: ch.isLive ? ch.color : "rgba(255,255,255,0.1)",
                      color: ch.isLive ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Icon name={ch.isLive ? "Play" : "Clock"} size={16} />
                    {ch.isLive ? "Смотреть" : "Скоро"}
                  </button>
                  <button
                    onClick={() => navigate({ page: "series", cartoonId: ch.cartoonId })}
                    className="px-4 py-3 rounded-2xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coming soon */}
      <div className="mt-8 rounded-3xl border-2 border-dashed border-white/15 p-8 text-center">
        <div className="text-5xl mb-4">🌟</div>
        <h3 className="font-russo text-white text-xl mb-2">Больше каналов скоро!</h3>
        <p className="text-white/40 text-sm">Новые мультсериалы уже в пути — следите за обновлениями</p>
      </div>
    </div>
  );
}
