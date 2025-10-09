"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/lib/utils";

interface PhoneInputV2Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function PhoneInputV2({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className,
  name = "phone",
  error = false,
  required = false,
  disabled = false,
}: PhoneInputV2Props) {
  return (
    <div className={cn("relative", className)}>
      <PhoneInput
        country="ng" // Default to Nigeria
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{
          name,
          required,
          disabled,
        }}
        containerStyle={{
          width: "100%",
        }}
        inputStyle={{
          width: "100%",
          height: "40px",
          border: error ? "1px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          paddingLeft: "48px",
          backgroundColor: disabled ? "#f9fafb" : "white",
          color: disabled ? "#9ca3af" : "inherit",
        }}
        buttonStyle={{
          border: error ? "1px solid #ef4444" : "1px solid #d1d5db",
          borderRight: "none",
          borderRadius: "6px 0 0 6px",
          backgroundColor: disabled ? "#f9fafb" : "white",
          height: "40px",
        }}
        dropdownStyle={{
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          maxHeight: "200px",
          overflow: "auto",
          width: "100%",
          minWidth: "280px",
          zIndex: 9999,
        }}
        searchStyle={{
          border: "1px solid #d1d5db",
          borderRadius: "4px",
          padding: "8px",
          fontSize: "14px",
        }}
        enableSearch={true}
        disableSearchIcon={false}
        searchPlaceholder="Search countries..."
        preferredCountries={["ng", "us", "gb", "fr", "de"]}
        enableAreaCodes={false}
        disableDropdown={disabled}
        autoFormat={true}
        specialLabel=""
        // Custom styles for focus state
        onFocus={() => {
          // Add focus styles via CSS classes
          const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
          const button = document.querySelector(`.react-tel-input .flag-dropdown`) as HTMLElement;
          if (input && !error) {
            input.style.borderColor = "#116114";
            input.style.boxShadow = "0 0 0 2px rgba(17, 97, 20, 0.1)";
          }
          if (button && !error) {
            button.style.borderColor = "#116114";
          }
        }}
        onBlur={() => {
          // Remove focus styles
          const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
          const button = document.querySelector(`.react-tel-input .flag-dropdown`) as HTMLElement;
          if (input && !error) {
            input.style.borderColor = "#d1d5db";
            input.style.boxShadow = "none";
          }
          if (button && !error) {
            button.style.borderColor = "#d1d5db";
          }
        }}
        // Custom CSS classes
        containerClass="react-tel-input"
        inputClass="phone-input-field"
        buttonClass="phone-input-button"
        dropdownClass="phone-input-dropdown"
        searchClass="phone-input-search"
      />
      
      {/* Custom CSS for better styling and responsiveness */}
      <style jsx>{`
        .react-tel-input {
          width: 100% !important;
        }
        
        .react-tel-input .flag-dropdown {
          border-radius: 6px 0 0 6px !important;
        }
        
        .react-tel-input input {
          border-radius: 0 6px 6px 0 !important;
          width: 100% !important;
        }
        
        .react-tel-input .flag-dropdown.open {
          border-color: #116114 !important;
          border-radius: 6px 0 0 0 !important;
        }
        
        .react-tel-input .flag-dropdown.open .selected-flag {
          border-radius: 6px 0 0 0 !important;
        }
        
        .react-tel-input input:focus {
          border-color: #116114 !important;
          box-shadow: 0 0 0 2px rgba(17, 97, 20, 0.1) !important;
        }
        
        .react-tel-input .flag-dropdown:focus {
          border-color: #116114 !important;
        }
        
        .react-tel-input .country-list {
          border-radius: 0 0 6px 6px !important;
          border: 1px solid #d1d5db !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          width: 100% !important;
          min-width: 280px !important;
          max-width: 100vw !important;
          left: 0 !important;
          right: auto !important;
          z-index: 9999 !important;
        }
        
        .react-tel-input .country-list .country {
          padding: 8px 12px !important;
          font-size: 14px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        
        .react-tel-input .country-list .country:hover {
          background-color: #f3f4f6 !important;
        }
        
        .react-tel-input .country-list .country.highlight {
          background-color: #e8f5e8 !important;
        }
        
        .react-tel-input .search-box {
          border-radius: 4px !important;
          border: 1px solid #d1d5db !important;
          padding: 8px !important;
          font-size: 14px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        
        .react-tel-input .search-box:focus {
          border-color: #116114 !important;
          box-shadow: 0 0 0 2px rgba(17, 97, 20, 0.1) !important;
        }
        
        /* Hide scrollbar for dropdown */
        .react-tel-input .country-list {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        .react-tel-input .country-list::-webkit-scrollbar {
          display: none !important;
        }
        
        /* Mobile responsive styles */
        @media (max-width: 640px) {
          .react-tel-input .country-list {
            width: calc(100vw - 32px) !important;
            max-width: 320px !important;
            left: 0 !important;
            right: auto !important;
          }
          
          .react-tel-input .country-list .country {
            padding: 12px !important;
            font-size: 16px !important;
          }
          
          .react-tel-input .search-box {
            padding: 12px !important;
            font-size: 16px !important;
          }
        }
        
        /* Tablet responsive styles */
        @media (min-width: 641px) and (max-width: 1024px) {
          .react-tel-input .country-list {
            width: 100% !important;
            max-width: 400px !important;
          }
        }
        
        /* Ensure dropdown doesn't overflow viewport */
        .react-tel-input .country-list {
          position: fixed !important;
          transform: translateX(0) !important;
        }
        
        /* Adjust dropdown position for mobile */
        @media (max-width: 640px) {
          .react-tel-input .country-list {
            position: fixed !important;
            left: 16px !important;
            right: 16px !important;
            width: calc(100vw - 32px) !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
}
