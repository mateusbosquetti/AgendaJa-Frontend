"use client";

import { useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  data: string[];
  onSelect: (item: string) => void;
  onChange?: (item: string) => void;
}

export default function SearchBar({ data, onSelect, onChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const filteredResults = searchQuery.trim()
    ? data.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleItemClick = (item: string) => {
    setSearchQuery("");
    setIsOpen(false);
    onSelect(item);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleSeeAll = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSeeAll();
    }
  };

  return (
    <Popover open={isOpen && searchQuery.trim() !== ""} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Search className="text-foreground/40 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search for fruits..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              setIsOpen(true);
              if (onChange) onChange(value);
            }}
            onKeyDown={handleKeyDown}
            className="border-foreground/10 focus-visible:ring-foreground/10 bg-background h-14 pr-12 pl-12 text-lg shadow-lg focus-visible:ring-1"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="hover:bg-foreground/5 absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 hover:cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="border-foreground/10 w-(--radix-popover-trigger-width) p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="max-h-[400px] overflow-y-auto">
          {filteredResults.length > 0 ? (
            <>
              <div className="py-2">
                {filteredResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="hover:bg-foreground/5 group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:cursor-pointer"
                  >
                    <Search className="text-foreground/40 group-hover:text-foreground/60 h-4 w-4" />
                    <span className="text-foreground/80 group-hover:text-foreground">{item}</span>
                  </button>
                ))}
              </div>
              <div className="border-foreground/10 border-t py-2">
                <button
                  onClick={handleSeeAll}
                  className="hover:bg-foreground/5 group flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:cursor-pointer"
                >
                  <span className="text-foreground/60 group-hover:text-foreground text-sm font-medium">
                    See all results for "{searchQuery}"
                  </span>
                  <ArrowRight className="text-foreground/40 group-hover:text-foreground/60 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-foreground/50 px-4 py-8 text-center">
              <p className="text-sm">No results found for "{searchQuery}"</p>
              <p className="text-foreground/40 mt-1 text-xs">
                Try searching for different keywords
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
