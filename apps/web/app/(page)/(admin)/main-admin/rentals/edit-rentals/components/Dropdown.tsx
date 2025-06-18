import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // install if not yet: npm i lucide-react

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-[#E5E5E7] text-sm px-3 py-3 rounded text-left text-[#181818] flex items-center justify-between"
      >
        <span>
          {value || <span className="text-gray-400"></span>}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow border border-gray-200 rounded">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-3 py-3 hover:bg-gray-300 cursor-pointer text-sm text-[#181818]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
