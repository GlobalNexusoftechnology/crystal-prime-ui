"use client";

import { SearchIcon } from "@/features";
import { JSX, useState } from "react";

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
  /** Placeholder text for the input field (optional). */
  placeholder?: string;
  /** Callback function triggered when the search input changes. */
  onSearch: (query: string) => void;

  bgColor?: string;
  width?: string;
  value?: string; // Add value prop for controlled input
}

/**
 * SearchBar component that provides an input field for user search queries,
 * accompanied by a search icon.
 *
 * @component
 * @param {SearchBarProps} props - The component props.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export function SearchBar({
  placeholder = "Search",
  onSearch,
  bgColor = "transparent",
  width = "min-w-[12rem] w-[25vw]",
  value,
}: SearchBarProps): JSX.Element {
  const [query, setQuery] = useState(""); // State to store the search query

  const inputValue = value !== undefined ? value : query;

  return (
    <div className={`bg-${bgColor} relative flex items-center border 2xl:border-[0.1vw] border-gray-300 px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] rounded-xl 2xl:rounded-[0.75vw] ${width}`}>
      {/* Search Icon */}
      <SearchIcon className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />

      {/* Search Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          if (value === undefined) setQuery(e.target.value); // Only update local state if uncontrolled
          onSearch(e.target.value); // Trigger the search function
        }}
        placeholder={placeholder}
        className="ml-2 2xl:ml-[0.5vw] bg-transparent focus:outline-none w-full 2xl:text-[1vw]"
      />
    </div>
  );
}
