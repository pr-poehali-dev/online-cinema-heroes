import { CARTOONS, CHANNELS } from "../data/cartoons";
import { type NavState } from "../App";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  navigate: (state: NavState) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-10 hero-gradient border border-white/10">
        <div className="absolute inset-0 stars-bg opacity-40" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-14">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-kidz-yellow/20 border border-kidz-yellow/30 rounded-full px-4 py-1 mb-4">
              <span className="w-2 h-2 rounded-full bg-kidz-yellow animate-pulse inline-block" />
              <span className="text-kidz-yellow text-sm font-bold">В эфире сейчас</span>
            </div>
            <h1 className="font-russo text-4xl md:text-6xl text-white mb-4 leading-tight">
              Добро пожаловать<br />
              <span className="gradient-text">в Поехали ТВ!</span>
            </h1>
            <p className="text-white/60 text-lg mb-6 max-w-md">
              Любимые мультики для малышей и детей постарше — в любое время, бесплатно!
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => navigate({ page: "cartoons" })}
                className="bg-kidz-yellow text-kidz-bg font-russo px-6 py-3 rounded-2xl text-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Icon name="Play" size={20} />
                Смотреть
              </button>
              <button
                onClick={() => navigate({ page: "channels" })}
                className="bg-white/10 text-white font-bold px-6 py-3 rounded-2xl text-lg hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Icon name="Tv" size={20} />
                ТВ-каналы
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-kidz-purple/40 to-kidz-pink/40 blur-2xl" />
              <img
                src={CARTOONS[0].image}
                alt="Геройчики"
                className="relative z-10 w-full h-full object-cover rounded-3xl border-2 border-white/20 animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confetti decorations */}
      <div className="flex justify-center gap-6 mb-8 text-3xl select-none opacity-60">
        <span className="animate-float" style={{ animationDelay: "0s" }}>🎈</span>
        <span className="animate-float" style={{ animationDelay: "0.5s" }}>⭐</span>
        <span className="animate-float" style={{ animationDelay: "1s" }}>🎉</span>
        <span className="animate-float" style={{ animationDelay: "1.5s" }}>🌟</span>
        <span className="animate-float" style={{ animationDelay: "0.8s" }}>🎈</span>
      </div>

      {/* Live channels */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-russo text-2xl text-white flex items-center gap-2">
            <Icon name="Tv" size={24} className="text-kidz-cyan" />
            ТВ-каналы
          </h2>
          <button
            onClick={() => navigate({ page: "channels" })}
            className="text-kidz-yellow text-sm font-bold hover:underline flex items-center gap-1"
          >
            Все каналы <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHANNELS.map((ch) => (
            <div
              key={ch.id}
              className="channel-card bg-card rounded-2xl p-5 border border-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => navigate({ page: "channels" })}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${ch.color}30`, border: `2px solid ${ch.color}50` }}
                >
                  {ch.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-russo text-white text-base">{ch.name}</span>
                    {ch.isLive && (
                      <span className="pill-badge bg-kidz-red/20 text-kidz-red border border-kidz-red/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-kidz-red animate-pulse inline-block" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm truncate">{ch.currentEpisode}</p>
                </div>
                <Icon name="ChevronRight" size={20} className="text-white/30 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Мультсериалы */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-russo text-2xl text-white flex items-center gap-2">
            <Icon name="Clapperboard" size={24} className="text-kidz-pink" />
            Мультсериалы
          </h2>
          <button
            onClick={() => navigate({ page: "cartoons" })}
            className="text-kidz-yellow text-sm font-bold hover:underline flex items-center gap-1"
          >
            Все <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARTOONS.map((cartoon) => (
            <div
              key={cartoon.id}
              className="card-glow bg-card rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
              onClick={() => navigate({ page: "series", cartoonId: cartoon.id })}
            >
              <div className="relative h-44 overflow-hidden">
                {cartoon.image ? (
                  <img
                    src={cartoon.image}
                    alt={cartoon.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-7xl"
                    style={{ background: `${cartoon.color}20` }}
                  >
                    📺
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="pill-badge bg-black/60 text-white border border-white/20">
                    {cartoon.ageRating}
                  </span>
                  <span className="pill-badge bg-black/60 text-white border border-white/20">
                    {cartoon.seasons} сезона
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-russo text-white text-lg mb-1">{cartoon.title}</h3>
                <p className="text-white/50 text-sm mb-3 line-clamp-2">{cartoon.description}</p>
                <div className="flex flex-wrap gap-1">
                  {cartoon.genres.map((g) => (
                    <span
                      key={g}
                      className="pill-badge text-xs"
                      style={{ background: `${cartoon.color}25`, color: cartoon.color, border: `1px solid ${cartoon.color}40` }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
