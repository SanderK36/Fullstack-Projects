"use client";

import { useEffect, useRef, useState } from "react";

type FilterOption = {
  value: string;
  label: string;
};

type FilterDropdownProps = {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOptionSelect(optionValue: string) {
    onChange(optionValue);
    setIsOpen(false);
  }

  return (
    <div
      ref={dropdownRef}
      className="relative w-full text-left sm:w-48"
    >
      <span className="mb-2 block px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#19192d] px-4 py-3 text-sm font-medium text-white outline-none transition ${
          isOpen
            ? "border-cyan-400/60 ring-2 ring-cyan-400/10"
            : "border-white/10 hover:border-cyan-400/30"
        }`}
      >
        <span>{selectedOption.label}</span>

        <span
          className={`text-xs text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-cyan-400/20 bg-[#19192d] p-1 shadow-2xl shadow-black/40"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <span className="text-cyan-400">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}