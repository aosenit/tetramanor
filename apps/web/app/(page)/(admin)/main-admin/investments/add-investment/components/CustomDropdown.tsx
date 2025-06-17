import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type Option = {
  label?: any;
  icon?: ReactNode;
};

type DropdownProps = {
  label: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
};

export function CustomDropdown({
  label,
  options,
  selected,
  onSelect,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.label === selected);

  return (
    <div className=" relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#323539] mb-1">
        {label}
      </label>
      <div className="flex rounded-md overflow-hidden">
        <div className="flex items-center w-full bg-[#E5E5E5] px-3 py-2 text-gray-700 text-sm">
          <span className="flex-1 flex items-center gap-2 truncate">
            {selectedOption?.icon} {selectedOption?.label || `Select ${label}`}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="bg-[#F8F9FB] px-3 flex items-center justify-center border-l border-gray-300"
        >
          <ChevronDown className="text-gray-600" size={18} />
        </button>
      </div>

      {open && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-md">
          {options.map((option, i) => (
            <li
              key={i}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex items-center gap-2"
              onClick={() => {
                onSelect(option.label);
                setOpen(false);
              }}
            >
              {option.icon} {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
