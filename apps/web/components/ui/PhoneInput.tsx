"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+356", country: "Malta", flag: "🇲🇹" },
  { code: "+357", country: "Cyprus", flag: "🇨🇾" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+375", country: "Belarus", flag: "🇧🇾" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+225", country: "Ivory Coast", flag: "🇨🇮" },
  { code: "+221", country: "Senegal", flag: "🇸🇳" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
  { code: "+227", country: "Niger", flag: "🇳🇪" },
  { code: "+228", country: "Togo", flag: "🇹🇬" },
  { code: "+229", country: "Benin", flag: "🇧🇯" },
  { code: "+230", country: "Mauritius", flag: "🇲🇺" },
  { code: "+231", country: "Liberia", flag: "🇱🇷" },
  { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
  { code: "+235", country: "Chad", flag: "🇹🇩" },
  { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲" },
  { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
  { code: "+239", country: "São Tomé and Príncipe", flag: "🇸🇹" },
  { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+241", country: "Gabon", flag: "🇬🇦" },
  { code: "+242", country: "Republic of the Congo", flag: "🇨🇬" },
  { code: "+243", country: "Democratic Republic of the Congo", flag: "🇨🇩" },
  { code: "+244", country: "Angola", flag: "🇦🇴" },
  { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴" },
  { code: "+247", country: "Ascension Island", flag: "🇦🇨" },
  { code: "+248", country: "Seychelles", flag: "🇸🇨" },
  { code: "+249", country: "Sudan", flag: "🇸🇩" },
  { code: "+252", country: "Somalia", flag: "🇸🇴" },
  { code: "+253", country: "Djibouti", flag: "🇩🇯" },
  { code: "+257", country: "Burundi", flag: "🇧🇮" },
  { code: "+258", country: "Mozambique", flag: "🇲🇿" },
  { code: "+260", country: "Zambia", flag: "🇿🇲" },
  { code: "+261", country: "Madagascar", flag: "🇲🇬" },
  { code: "+262", country: "Réunion", flag: "🇷🇪" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
  { code: "+264", country: "Namibia", flag: "🇳🇦" },
  { code: "+265", country: "Malawi", flag: "🇲🇼" },
  { code: "+266", country: "Lesotho", flag: "🇱🇸" },
  { code: "+267", country: "Botswana", flag: "🇧🇼" },
  { code: "+268", country: "Swaziland", flag: "🇸🇿" },
  { code: "+269", country: "Comoros", flag: "🇰🇲" },
  { code: "+290", country: "Saint Helena", flag: "🇸🇭" },
  { code: "+291", country: "Eritrea", flag: "🇪🇷" },
  { code: "+297", country: "Aruba", flag: "🇦🇼" },
  { code: "+298", country: "Faroe Islands", flag: "🇫🇴" },
  { code: "+299", country: "Greenland", flag: "🇬🇱" },
  { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+354", country: "Iceland", flag: "🇮🇸" },
  { code: "+355", country: "Albania", flag: "🇦🇱" },
  { code: "+356", country: "Malta", flag: "🇲🇹" },
  { code: "+357", country: "Cyprus", flag: "🇨🇾" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
  { code: "+373", country: "Moldova", flag: "🇲🇩" },
  { code: "+374", country: "Armenia", flag: "🇦🇲" },
  { code: "+375", country: "Belarus", flag: "🇧🇾" },
  { code: "+376", country: "Andorra", flag: "🇦🇩" },
  { code: "+377", country: "Monaco", flag: "🇲🇨" },
  { code: "+378", country: "San Marino", flag: "🇸🇲" },
  { code: "+379", country: "Vatican City", flag: "🇻🇦" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+381", country: "Serbia", flag: "🇷🇸" },
  { code: "+382", country: "Montenegro", flag: "🇲🇪" },
  { code: "+383", country: "Kosovo", flag: "🇽🇰" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮" },
  { code: "+387", country: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "+389", country: "North Macedonia", flag: "🇲🇰" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰" },
  { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
  { code: "+500", country: "Falkland Islands", flag: "🇫🇰" },
  { code: "+501", country: "Belize", flag: "🇧🇿" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+507", country: "Panama", flag: "🇵🇦" },
  { code: "+508", country: "Saint Pierre and Miquelon", flag: "🇵🇲" },
  { code: "+509", country: "Haiti", flag: "🇭🇹" },
  { code: "+590", country: "Guadeloupe", flag: "🇬🇵" },
  { code: "+591", country: "Bolivia", flag: "🇧🇴" },
  { code: "+592", country: "Guyana", flag: "🇬🇾" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+594", country: "French Guiana", flag: "🇬🇫" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾" },
  { code: "+596", country: "Martinique", flag: "🇲🇶" },
  { code: "+597", country: "Suriname", flag: "🇸🇷" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+599", country: "Netherlands Antilles", flag: "🇧🇶" },
  { code: "+670", country: "East Timor", flag: "🇹🇱" },
  { code: "+672", country: "Australian External Territories", flag: "🇦🇶" },
  { code: "+673", country: "Brunei", flag: "🇧🇳" },
  { code: "+674", country: "Nauru", flag: "🇳🇷" },
  { code: "+675", country: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+676", country: "Tonga", flag: "🇹🇴" },
  { code: "+677", country: "Solomon Islands", flag: "🇸🇧" },
  { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
  { code: "+679", country: "Fiji", flag: "🇫🇯" },
  { code: "+680", country: "Palau", flag: "🇵🇼" },
  { code: "+681", country: "Wallis and Futuna", flag: "🇼🇫" },
  { code: "+682", country: "Cook Islands", flag: "🇨🇰" },
  { code: "+683", country: "Niue", flag: "🇳🇺" },
  { code: "+684", country: "American Samoa", flag: "🇦🇸" },
  { code: "+685", country: "Samoa", flag: "🇼🇸" },
  { code: "+686", country: "Kiribati", flag: "🇰🇮" },
  { code: "+687", country: "New Caledonia", flag: "🇳🇨" },
  { code: "+688", country: "Tuvalu", flag: "🇹🇻" },
  { code: "+689", country: "French Polynesia", flag: "🇵🇫" },
  { code: "+690", country: "Tokelau", flag: "🇹🇰" },
  { code: "+691", country: "Micronesia", flag: "🇫🇲" },
  { code: "+692", country: "Marshall Islands", flag: "🇲🇭" },
  { code: "+850", country: "North Korea", flag: "🇰🇵" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+853", country: "Macau", flag: "🇲🇴" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+960", country: "Maldives", flag: "🇲🇻" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+963", country: "Syria", flag: "🇸🇾" },
  { code: "+964", country: "Iraq", flag: "🇮🇶" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+967", country: "Yemen", flag: "🇾🇪" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+970", country: "Palestine", flag: "🇵🇸" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹" },
  { code: "+976", country: "Mongolia", flag: "🇲🇳" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
  { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
  { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
  { code: "+995", country: "Georgia", flag: "🇬🇪" },
  { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
];

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function PhoneInput({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className,
  name = "phone",
  error = false,
  required = false,
  disabled = false,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    countryCodes.find((c) => c.code === "+234") || countryCodes[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Initialize with Nigeria as default
  React.useEffect(() => {
    if (value) {
      // Try to parse existing value
      const foundCountry = countryCodes.find((country) =>
        value.startsWith(country.code)
      );
      if (foundCountry) {
        setSelectedCountry(foundCountry);
        setPhoneNumber(value.replace(foundCountry.code, ""));
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm("");
    setHighlightedIndex(0);
    const fullNumber = country.code + phoneNumber;
    onChange?.(fullNumber);
  };

  // Filter countries based on search term
  const filteredCountries = countryCodes.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm)
  );

  // Reset highlighted index when search term changes
  React.useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  // Scroll to highlighted item
  React.useEffect(() => {
    if (isDropdownOpen && filteredCountries.length > 0) {
      const highlightedElement = document.querySelector(`[data-country-index="${highlightedIndex}"]`);
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex, isDropdownOpen, filteredCountries.length]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Only allow digits
    setPhoneNumber(inputValue);
    const fullNumber = selectedCountry.code + inputValue;
    onChange?.(fullNumber);
  };

  // Handle form validation by ensuring the input has a name attribute
  const inputProps = {
    type: "tel" as const,
    value: phoneNumber,
    onChange: handlePhoneChange,
    placeholder,
    required,
    disabled,
    name, // Use the name prop for form validation
    className: cn(
      "flex-1 border-0 rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0",
      disabled && "cursor-not-allowed"
    ),
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsDropdownOpen(false);
        setSearchTerm("");
        setHighlightedIndex(0);
        break;
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center border rounded-md bg-background transition-all duration-200",
        error ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500" : "border-input focus-within:ring-2 focus-within:ring-[#116114] focus-within:border-[#116114]",
        disabled && "opacity-50 cursor-not-allowed bg-muted"
      )}>
        {/* Country Code Dropdown */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className={cn(
            "h-10 px-3 py-2 text-sm font-medium text-foreground hover:bg-accent focus:outline-none transition-colors duration-200 rounded-r-none border-r border-input",
            error && "border-r-red-500",
            disabled && "cursor-not-allowed"
          )}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-base">{selectedCountry.flag}</span>
            <span className="font-semibold">{selectedCountry.code}</span>
          </span>
          <ChevronDown className={cn(
            "h-4 w-4 ml-1 transition-transform duration-200",
            isDropdownOpen && "rotate-180"
          )} />
        </Button>

        {/* Phone Number Input */}
        <Input
          {...inputProps}
        />
      </div>

      {/* Country Dropdown */}
      {isDropdownOpen && (
        <div 
          className="absolute top-full left-0 z-50 w-72 mt-2 bg-popover border border-border rounded-lg shadow-xl max-h-80 overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          <div className="p-3 border-b border-border">
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              className="w-full text-sm focus-visible:ring-[#116114] focus-visible:border-[#116114] transition-all duration-200"
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <Button
                  key={country.code}
                  type="button"
                  variant="ghost"
                  data-country-index={index}
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full justify-start gap-3 px-4 py-3 text-sm h-auto transition-colors duration-150",
                    "hover:bg-accent focus:bg-accent",
                    selectedCountry.code === country.code && "bg-[#e8f5e8] text-[#116114] hover:bg-[#e8f5e8]",
                    index === highlightedIndex && "bg-accent border-l-2 border-[#116114]"
                  )}
                >
                  <span className="text-lg flex-shrink-0">{country.flag}</span>
                  <span className="font-semibold text-foreground flex-shrink-0 w-12">{country.code}</span>
                  <span className="text-muted-foreground truncate">{country.country}</span>
                </Button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
