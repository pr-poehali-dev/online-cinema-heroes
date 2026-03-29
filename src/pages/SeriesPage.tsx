import { useState } from "react";
import { CARTOONS } from "../data/cartoons";
import { type NavState } from "../App";
import Icon from "@/components/ui/icon";

interface SeriesPageProps {
  cartoonId: string;
  navigate: (state: NavState) => void;
}

export default function SeriesPage({ cartoonId, navigate }: SeriesPageProps) {
  const cartoon = CARTOONS.find((c) => c.id === cartoonId);
  const [activeSeason, setActiveSeason] = useState(1);
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);
  const [playerTitle, setPlayerTitle] = useState("");

  if (!cartoon) {
    return (
      <div className="text-center py-20 text-white/50">
        <div className="text-5xl mb-4">😕</div>
        <p>Мультсериал не найден</p>
        <button onClick={() => navigate({ page: "cartoons" })} className="mt-4 text-kidz-yellow underline">
          Вернуться назад
        </button>
      </div>
    );
  }

  const currentSeason = cartoon.seasonData.find((s) => s.number === activeSeason);

  const openPlayer = (url: string, title: string) => {
    setPlayerUrl(url);
    setPlayerTitle(title);
  };

  const closePlayer = () => {
    setPlayerUrl(null);
    setPlayerTitle("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Video Player Modal */}
      {playerUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closePlayer}
        >
          <div
            className="relative w-full max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-white font-russo text-lg truncate pr-4">{playerTitle}</p>
              <button
                onClick={closePlayer}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all flex-shrink-0"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            {/* Player */}
            <div className="rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={playerUrl}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none" }}
              />
            </div>
            <p className="text-white/30 text-xs text-center mt-3">
              Нажми за пределами плеера, чтобы закрыть
            </p>
          </div>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate({ page: "cartoons" })}
        className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors font-bold"
      >
        <Icon name="ChevronLeft" size={20} />
        Все мультсериалы
      </button>

      {/* Hero section */}
      <div className="relative rounded-3xl overflow-hidden mb-8 border border-white/10">
        <div className="absolute inset-0">
          {cartoon.image ? (
            <img src={cartoon.image} alt={cartoon.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: `${cartoon.color}20` }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 p-8 md:p-12 min-h-[220px] flex flex-col justify-end">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="pill-badge bg-white/15 text-white border border-white/20 text-xs">{cartoon.ageRating}</span>
            <span className="pill-badge bg-white/15 text-white border border-white/20 text-xs">
              {cartoon.seasons} {cartoon.seasons === 1 ? "сезон" : "сезона"}
            </span>
            {cartoon.totalEpisodes > 0 && (
              <span className="pill-badge bg-white/15 text-white border border-white/20 text-xs">
                {cartoon.totalEpisodes} серий
              </span>
            )}
            <span className="pill-badge bg-white/15 text-white border border-white/20 text-xs">{cartoon.years}</span>
          </div>
          <h1 className="font-russo text-4xl md:text-5xl text-white mb-3">{cartoon.title}</h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed">{cartoon.description}</p>
        </div>
      </div>

      {/* Genres & Heroes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-2xl p-4 border border-white/10">
          <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1">
            <Icon name="Tag" size={12} />
            Жанры
          </p>
          <div className="flex flex-wrap gap-2">
            {cartoon.genres.map((g) => (
              <span key={g} className="pill-badge" style={{ background: `${cartoon.color}25`, color: cartoon.color, border: `1px solid ${cartoon.color}40` }}>
                {g}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-white/10">
          <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1">
            <Icon name="Smile" size={12} />
            Герои
          </p>
          <div className="flex flex-wrap gap-2">
            {cartoon.heroes.map((h) => (
              <span key={h} className="pill-badge bg-white/10 text-white border border-white/15">{h}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Season tabs */}
      {cartoon.seasonData.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            {cartoon.seasonData.map((s) => (
              <button
                key={s.number}
                onClick={() => setActiveSeason(s.number)}
                className={`px-6 py-2.5 rounded-xl font-russo text-sm transition-all ${
                  activeSeason === s.number
                    ? "text-kidz-bg shadow-lg"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
                style={activeSeason === s.number ? { background: cartoon.color } : {}}
              >
                Сезон {s.number}
              </button>
            ))}
          </div>

          {/* Episodes list */}
          {currentSeason && currentSeason.episodes.length > 0 ? (
            <div className="bg-card rounded-2xl border border-white/10 overflow-hidden">
              {currentSeason.episodes.map((ep, i) => (
                <div
                  key={ep.number}
                  className="episode-row flex items-center gap-4 px-5 py-4 transition-all duration-200 border-b border-white/5 last:border-b-0"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  {/* Number */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-russo text-sm"
                    style={{ background: `${cartoon.color}20`, color: cartoon.color }}
                  >
                    {ep.number}
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      Серия {ep.number} — {ep.title}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">Сезон {activeSeason}</p>
                  </div>

                  {/* Available badge */}
                  {ep.videoUrl && (
                    <span className="pill-badge bg-kidz-green/15 text-kidz-green border border-kidz-green/30 text-xs flex-shrink-0 hidden sm:inline-flex">
                      <Icon name="CheckCircle" size={11} />
                      Доступно
                    </span>
                  )}

                  {/* Play button */}
                  <button
                    onClick={() => ep.videoUrl && openPlayer(ep.videoUrl, `${cartoon.title} — Серия ${ep.number}: ${ep.title}`)}
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      ep.videoUrl
                        ? "hover:scale-110 cursor-pointer"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                    style={{ background: ep.videoUrl ? `${cartoon.color}30` : "rgba(255,255,255,0.05)", color: ep.videoUrl ? cartoon.color : "#fff" }}
                    title={ep.videoUrl ? "Смотреть" : "Скоро"}
                    disabled={!ep.videoUrl}
                  >
                    <Icon name={ep.videoUrl ? "Play" : "Clock"} size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-white/10 p-12 text-center">
              <div className="text-5xl mb-4">⏳</div>
              <h3 className="font-russo text-white text-xl mb-2">Скоро!</h3>
              <p className="text-white/40 text-sm">Серии {activeSeason} сезона скоро будут добавлены</p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {cartoon.seasonData.length === 0 && (
        <div className="bg-card rounded-2xl border border-white/10 p-12 text-center">
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="font-russo text-white text-xl mb-2">Скоро!</h3>
          <p className="text-white/40 text-sm">Этот мультсериал ещё в разработке</p>
        </div>
      )}
    </div>
  );
}
