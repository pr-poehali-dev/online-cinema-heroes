import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Page, type NavState } from "../App";

interface NavbarProps {
  currentPage: Page;
  navigate: (state: NavState) => void;
}

const links = [
  { id: "home" as Page, label: "Главная", icon: "Home" },
  { id: "channels" as Page, label: "ТВ-каналы", icon: "Tv" },
  { id: "cartoons" as Page, label: "Мультсериалы", icon: "Clapperboard" },
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-glow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ page: "home" })}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl animate-float">🚀</span>
            <span className="font-russo text-xl gradient-text tracking-wide">
              Поехали ТВ
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate({ page: link.id })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  currentPage === link.id
                    ? "bg-kidz-yellow text-kidz-bg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </button>
            ))}
          </div>

          {/* Stars decoration */}
          <div className="hidden md:flex items-center gap-2 text-kidz-yellow text-xl select-none">
            ⭐ ✨ ⭐
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 animate-fade-in">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { navigate({ page: link.id }); setMenuOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-sm mb-1 transition-all ${
                currentPage === link.id
                  ? "bg-kidz-yellow text-kidz-bg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon name={link.icon} size={18} />
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
