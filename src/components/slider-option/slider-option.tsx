"use client";

import React, { useState, useRef, useEffect } from "react";

export interface SliderOption {
  id: string | number;
  label: string;
}

interface SliderOptionsProps {
  options: SliderOption[];
  defaultActive?: string | number;
  onOptionChange?: (optionId: string | number) => void;
}

export default function SliderOptions({
  options,
  defaultActive,
  onOptionChange,
}: SliderOptionsProps) {
  const [activeId, setActiveId] = useState<string | number>(defaultActive || options[0]?.id || "");
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });
  const optionsRef = useRef<Record<string | number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeButton = optionsRef.current[activeId];
    if (activeButton) {
      const parentContainer = activeButton.parentElement;
      if (parentContainer) {
        const offset = activeButton.offsetLeft;
        const width = activeButton.offsetWidth;

        setUnderlineStyle({
          width,
          left: offset,
        });
      }
    }
  }, [activeId]);

  const handleOptionClick = (id: string | number) => {
    setActiveId(id);
    onOptionChange?.(id);
  };

  const activeOption = options.find((opt) => opt.id === activeId);

  return (
    <div className="w-full">
      <div className="border-border relative border-b">
        <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Options">
          {options.map((option) => (
            <button
              key={option.id}
              ref={(el) => {
                if (el) optionsRef.current[option.id] = el;
              }}
              role="tab"
              aria-selected={activeId === option.id}
              aria-controls={`panel-${option.id}`}
              onClick={() => handleOptionClick(option.id)}
              className={`relative cursor-pointer px-4 py-3 text-base font-medium whitespace-nowrap transition-colors duration-200 ${
                activeId === option.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } `}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          className="bg-foreground absolute bottom-0 h-0.5 transition-all duration-300 ease-out"
          style={{
            width: `${underlineStyle.width}px`,
            transform: `translateX(${underlineStyle.left}px)`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
