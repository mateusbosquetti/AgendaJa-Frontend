"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

type idLabel = {
  id: number;
  label: string;
};

interface SearchBarProps {
  data: idLabel[];
  placeholder?: string;
  onSelect: (id: number) => void;
  onChange?: (query: string) => void;
}

export default function SearchBar({ data, placeholder, onSelect, onChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Fecha o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = searchQuery.trim()
    ? data
        .filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
    : [];

  const handleItemClick = (item: idLabel) => {
    setSearchQuery("");
    setIsOpen(false);
    onSelect(item.id);
  };

  const handleSeeAll = () => {
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSeeAll();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <label className="input input-bordered flex w-full items-center gap-2">
        <Search className="h-4 w-4 opacity-70" />
        <input
          type="search"
          placeholder={placeholder || "Buscar..."}
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            setIsOpen(value.trim().length > 0);
            if (onChange) onChange(value);
          }}
          onFocus={() => {
            if (searchQuery.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="grow"
        />
      </label>

      {isOpen && searchQuery.trim() && (
        <div className="border-base-300 bg-base-100 absolute z-50 mt-2 w-full rounded-lg border shadow-xl">
          {filteredResults.length > 0 ? (
            <>
              <ul className="menu menu-compact w-full">
                {filteredResults.map((item, index) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className="flex w-full items-center gap-3"
                    >
                      <Search className="h-4 w-4 opacity-60" />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="divider my-0"></div>

              <div className="p-2">
                <button
                  onClick={handleSeeAll}
                  className="flex w-full cursor-pointer items-center justify-between rounded-sm p-2"
                >
                  <span className="text-sm font-medium">
                    Ver todos os resultados para "{searchQuery}"
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm opacity-70">Nenhum resultado encontrado para "{searchQuery}"</p>
              <p className="mt-1 text-xs opacity-50">Tente buscar por palavras-chave diferentes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
