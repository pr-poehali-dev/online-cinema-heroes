export interface Episode {
  number: number;
  title: string;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Cartoon {
  id: string;
  title: string;
  ageRating: string;
  seasons: number;
  totalEpisodes: number;
  years: string;
  description: string;
  image: string;
  genres: string[];
  heroes: string[];
  color: string;
  seasonData: Season[];
}

export const CARTOONS: Cartoon[] = [
  {
    id: "geroychiki",
    title: "Геройчики",
    ageRating: "0+",
    seasons: 2,
    totalEpisodes: 26,
    years: "2022–2023",
    description:
      "Мальчик Рома очень любит играть, поэтому в его комнате полным-полно разных игрушек. Кого здесь только нет: и загадочный пушистый инопланетянин Бублик, и отважный петух-тянучка Ко-Ко, и благородная ящерица-самурай О-Раш, и милая куколка Пинки, и воинственный плюшевый заяц Генерал Де-Кроль со своими роботами, и, конечно, отважные супергерои Флай и Глория. Все эти игрушки обожают игры, веселье, соревнования, приключения и вечеринки.",
    image:
      "https://cdn.poehali.dev/projects/2148a5a4-9915-4fe0-9a7c-458d6600f978/files/61dda070-9dd2-4568-bbcb-0b9ba71ba3cb.jpg",
    genres: ["Комедия", "Приключения", "Дружба"],
    heroes: ["Бублик", "Ко-Ко", "О-Раш", "Пинки", "Де-Кроль", "Флай", "Глория", "Рома"],
    color: "#FF6B35",
    seasonData: [
      {
        number: 1,
        episodes: [
          { number: 1, title: "Новые герои" },
          { number: 2, title: "Плохая примета" },
          { number: 3, title: "Лунная гонка" },
          { number: 4, title: "Идеальный друг" },
          { number: 5, title: "Флаг для Генерала" },
          { number: 6, title: "Таинственная коробка" },
          { number: 7, title: "Сладкая миссия" },
          { number: 8, title: "Супергерой" },
          { number: 9, title: "Метод Флая" },
          { number: 10, title: "За фантазию" },
          { number: 11, title: "Любимая игрушка" },
          { number: 12, title: "Эмблема команды" },
          { number: 13, title: "Премия Пинки" },
          { number: 14, title: "Секрет Де-Кроля" },
          { number: 15, title: "Одиссея Бублика" },
          { number: 16, title: "Возвращение Пинки" },
          { number: 17, title: "Одиночество Бублика" },
          { number: 18, title: "Страшный праздник" },
          { number: 19, title: "Хвост О-Раша" },
          { number: 20, title: "История Ко-Ко" },
          { number: 21, title: "Конкурс точилок" },
          { number: 22, title: "Другая Глория" },
          { number: 23, title: "Мелкотрон Крузо" },
          { number: 24, title: "История Бублика" },
          { number: 25, title: "Жаркий четверг" },
          { number: 26, title: "Блогер" },
        ],
      },
      {
        number: 2,
        episodes: [],
      },
    ],
  },
  {
    id: "um-i-hrum",
    title: "Ум и Хрум",
    ageRating: "0+",
    seasons: 1,
    totalEpisodes: 0,
    years: "Скоро",
    description: "Описание скоро будет добавлено. Следите за обновлениями!",
    image: "",
    genres: ["Комедия"],
    heroes: ["Ум", "Хрум"],
    color: "#8B5CF6",
    seasonData: [],
  },
];

export const CHANNELS = [
  {
    id: "geroychiki-channel",
    name: "Геройчики ТВ",
    description: "Круглосуточный канал с мультсериалом Геройчики",
    icon: "🦸",
    color: "#FF6B35",
    cartoonId: "geroychiki",
    isLive: true,
    currentEpisode: "Геройчики — Новые герои",
  },
  {
    id: "um-hrum-channel",
    name: "Ум и Хрум ТВ",
    description: "Канал мультсериала Ум и Хрум",
    icon: "🧠",
    color: "#8B5CF6",
    cartoonId: "um-i-hrum",
    isLive: false,
    currentEpisode: "Скоро в эфире",
  },
];
