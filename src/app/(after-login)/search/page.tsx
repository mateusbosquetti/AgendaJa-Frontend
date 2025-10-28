"use client";

import type React from "react";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowLeft, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data
const mockData = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Watermelon",
];

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Filter results (case-insensitive, all items)
  const filteredResults = searchQuery.trim()
    ? mockData.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleItemClick = (item: string) => {
    console.log(item);
    router.push(`/item/${encodeURIComponent(item.toLowerCase())}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    router.push("/search");
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      {/* <div className="border-foreground/10 bg-background/80 sticky top-0 z-10 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-4">
            teste
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="hover:bg-foreground/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="text-foreground/40 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search for fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-foreground/10 focus-visible:ring-foreground/20 bg-background h-12 pr-12 pl-12 focus-visible:ring-2"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearSearch}
                  className="hover:bg-foreground/5 absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* Results */}
      <div className="mx-auto max-w-4xl">
        {searchQuery.trim() ? (
          <>
            <div className="mb-6">
              <h1 className="text-foreground mb-2 text-2xl font-bold">
                Search results for "{searchQuery}"
              </h1>
              <p className="text-foreground/60">
                Found {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"}
              </p>
            </div>

            {filteredResults.length > 0 ? (
              <div className="grid gap-3">
                {filteredResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="bg-background border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 group w-full rounded-lg border p-6 text-left transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-foreground/5 group-hover:bg-foreground/10 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                        <Search className="text-foreground/40 group-hover:text-foreground/60 h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground group-hover:text-foreground/80 text-lg font-semibold">
                          {item}
                        </h3>
                        <p className="text-foreground/60 mt-1 text-sm">
                          Click to view details about {item}
                        </p>
                      </div>
                      <ArrowLeft className="text-foreground/40 group-hover:text-foreground/60 h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="bg-foreground/5 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Search className="text-foreground/40 h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-2 text-xl font-semibold">No results found</h3>
                <p className="text-foreground/60 mb-6">
                  We couldn't find any results for "{searchQuery}"
                </p>
                <p className="text-foreground/40 text-sm">
                  Try searching for: Apple, Banana, Cherry, or any other fruit
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="bg-foreground/5 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Search className="text-foreground/40 h-8 w-8" />
            </div>
            <h3 className="text-foreground mb-2 text-xl font-semibold">Start searching</h3>
            <p className="text-foreground/60">Enter a search term to find fruits</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-background flex min-h-screen items-center justify-center">
          <div className="text-foreground/60">Loading...</div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
