import { useState } from "react";
import { CHANNELS, CARTOONS, type Channel } from "../data/cartoons";
import { type NavState } from "../App";
import Icon from "@/components/ui/icon";

interface ChannelsPageProps {
  navigate: (state: NavState) => void;
}

export default function ChannelsPage({ navigate }: ChannelsPageProps) {
  const [filter, setFilter] = useState<"all" | "live" | "soon">("all");
  const [activeStream, setActiveStream] = useState<{ name: string; url: string } | null>(null);

  const filtered = CHANNELS.filter((ch) => {
    if (filter === "live") return ch.isLive;
    if (filter === "soon") return !ch.isLive;
    return true;
  });

  const liveCount = CHANNELS.filter((c) => c.isLive).length;

  const handleChannelClick = (ch: Channel) => {
    if (ch.cartoonId) {
      navigate({ page: "series", cartoonId: ch.cartoonId });
    } else if (ch.streamUrl) {
      setActiveStream({ name: ch.name, url: ch.streamUrl });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📡</span>
          <h1 className="font-russo text-4xl text-white">ТВ-каналы</h1>
        </div>
        <p className="text-white/50 text-lg">
          {CHANNELS.length} каналов — смотри любимые мультики прямо сейчас!
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8">
        {[
          { id: "all" as const, label: "Все каналы", count: CHANNELS.length },
          { id: "live" as const, label: "В эфире", count: liveCount },
          { id: "soon" as const, label: "Скоро", count: CHANNELS.length - liveCount },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              filter === tab.id
                ? "bg-kidz-yellow text-kidz-bg"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {tab.id === "live" && (
              <span className="w-2 h-2 rounded-full bg-kidz-red animate-pulse inline-block" />
            )}
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs font-russo ${
                filter === tab.id ? "bg-black/20 text-kidz-bg" : "bg-white/10 text-white/50"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Stream modal */}
      {activeStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-card rounded-2xl border border-white/10 w-full max-w-4xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-kidz-red animate-pulse inline-block" />
                <span className="font-russo text-white">{activeStream.name}</span>
                <span className="text-white/40 text-xs">LIVE</span>
              </div>
              <button
                onClick={() => setActiveStream(null)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={activeStream.url}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                title={activeStream.name}
              />
            </div>
            <div className="px-5 py-3 text-center">
              <a
                href={activeStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kidz-yellow text-sm hover:underline"
              >
                Открыть на сайте канала →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Channels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((ch, i) => {
          const cartoon = CARTOONS.find((c) => c.id === ch.cartoonId);
          const hasStream = !!ch.streamUrl || !!ch.cartoonId;
          return (
            <div
              key={ch.id}
              className="channel-card bg-card rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => handleChannelClick(ch)}
            >
              {/* Banner */}
              <div
                className="relative h-28 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${ch.color}35, ${ch.color}10)` }}
              >
                <div className="absolute inset-0 stars-bg opacity-20" />
                <span className="relative text-6xl z-10">{ch.icon}</span>
                {ch.isLive ? (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-kidz-red px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                    <span className="text-white text-xs font-russo">LIVE</span>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
                    <span className="text-white/50 text-xs font-bold">Скоро</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-russo text-white text-base mb-1 truncate">{ch.name}</h3>
                <p className="text-white/40 text-xs mb-3 line-clamp-2 leading-relaxed">{ch.description}</p>

                {/* Now playing */}
                <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 mb-3">
                  <Icon
                    name={ch.isLive ? "Play" : "Clock"}
                    size={12}
                    className={ch.isLive ? "text-kidz-yellow flex-shrink-0" : "text-white/30 flex-shrink-0"}
                  />
                  <span className="text-white/60 text-xs truncate">{ch.currentEpisode}</span>
                </div>

                {/* Meta */}
                {cartoon && (
                  <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
                    <span className="flex items-center gap-1">
                      <Icon name="Film" size={10} />
                      {cartoon.totalEpisodes > 0 ? `${cartoon.totalEpisodes} серий` : "—"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Star" size={10} />
                      {cartoon.ageRating}
                    </span>
                  </div>
                )}

                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{
                    background: hasStream ? ch.color : "rgba(255,255,255,0.08)",
                    color: hasStream ? "#fff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <Icon name={hasStream ? "Play" : "Bell"} size={14} />
                  {hasStream ? "Смотреть" : "Уведомить"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty filtered state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📺</div>
          <p className="text-white/40">Нет каналов в этой категории</p>
        </div>
      )}
    </div>
  );
}