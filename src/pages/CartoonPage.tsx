import { useState } from "react";
import { CARTOONS } from "../data/cartoons";
import { type NavState } from "../App";
import Icon from "@/components/ui/icon";

interface CartoonPageProps {
  navigate: (state: NavState) => void;
}

const ALL_GENRES = ["Все", "Комедия", "Приключения", "Дружба"];
const ALL_HEROES = ["Все", "Бублик", "Ко-Ко", "О-Раш", "Пинки", "Де-Кроль", "Флай", "Глория", "Ум", "Хрум"];

export default function CartoonPage({ navigate }: CartoonPageProps) {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const [selectedHero, setSelectedHero] = useState("Все");

  const filtered = CARTOONS.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === "Все" || c.genres.includes(selectedGenre);
    const matchHero = selectedHero === "Все" || c.heroes.includes(selectedHero);
    return matchSearch && matchGenre && matchHero;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🎬</span>
          <h1 className="font-russo text-4xl text-white">Мультсериалы</h1>
        </div>
        <p className="text-white/50 text-lg">Выбери мультик и смотри прямо сейчас!</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Найти мультсериал..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-glow w-full bg-card border border-white/15 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/30 outline-none text-lg transition-all font-nunito"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      {/* Genre filter */}
      <div className="mb-4">
        <p className="text-white/40 text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-1">
          <Icon name="Tag" size={14} />
          Жанр
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedGenre === genre
                  ? "bg-kidz-pink text-white shadow-lg shadow-kidz-pink/25"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Hero filter */}
      <div className="mb-8">
        <p className="text-white/40 text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-1">
          <Icon name="Smile" size={14} />
          Герой
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_HEROES.map((hero) => (
            <button
              key={hero}
              onClick={() => setSelectedHero(hero)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedHero === hero
                  ? "bg-kidz-cyan text-kidz-bg shadow-lg shadow-kidz-cyan/25"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {hero}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-russo text-white text-xl mb-2">Ничего не найдено</h3>
          <p className="text-white/40">Попробуй другие фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cartoon, i) => (
            <div
              key={cartoon.id}
              className="card-glow bg-card rounded-2xl overflow-hidden border border-white/10 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => navigate({ page: "series", cartoonId: cartoon.id })}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                {cartoon.image ? (
                  <img
                    src={cartoon.image}
                    alt={cartoon.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-8xl"
                    style={{ background: `${cartoon.color}20` }}
                  >
                    📺
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-kidz-yellow/90 flex items-center justify-center shadow-2xl">
                    <Icon name="Play" size={28} className="text-kidz-bg ml-1" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="pill-badge bg-black/70 text-white border border-white/20 text-xs">
                    {cartoon.ageRating}
                  </span>
                  <span className="pill-badge bg-black/70 text-white border border-white/20 text-xs">
                    {cartoon.seasons} {cartoon.seasons === 1 ? "сезон" : "сезона"}
                  </span>
                  {cartoon.totalEpisodes > 0 && (
                    <span className="pill-badge bg-black/70 text-white border border-white/20 text-xs">
                      {cartoon.totalEpisodes} серий
                    </span>
                  )}
                </div>

                {/* Year */}
                <div className="absolute top-3 right-3">
                  <span className="pill-badge text-xs" style={{ background: `${cartoon.color}40`, color: cartoon.color, border: `1px solid ${cartoon.color}60` }}>
                    {cartoon.years}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-russo text-white text-xl mb-2">{cartoon.title}</h3>
                <p className="text-white/50 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {cartoon.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {cartoon.genres.map((g) => (
                    <span
                      key={g}
                      className="pill-badge text-xs"
                      style={{ background: `${cartoon.color}20`, color: cartoon.color, border: `1px solid ${cartoon.color}40` }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <Icon name="Users" size={12} className="text-white/30" />
                  {cartoon.heroes.slice(0, 4).map((h) => (
                    <span key={h} className="text-xs text-white/30">{h}</span>
                  ))}
                  {cartoon.heroes.length > 4 && (
                    <span className="text-xs text-white/20">+{cartoon.heroes.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
