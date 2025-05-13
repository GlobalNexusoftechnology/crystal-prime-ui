"use client";

import { SearchIcon } from "@/features";
import { useState } from "react";

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
  /** Placeholder text for the input field (optional). */
  placeholder?: string;
  /** Callback function triggered when the search input changes. */
  onSearch: (query: string) => void;
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
}: SearchBarProps): JSX.Element {
  const [query, setQuery] = useState(""); // State to store the search query

  return (
    <div className="relative flex items-center bg-transparent border 2xl:border-[0.1vw] border-gray-400 px-4 py-2 min-w-sm rounded-xl 2xl:rounded-[0.75vw] min-w-[12rem] w-[25vw]">
      {/* Search Icon */}
      <SearchIcon className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />

      {/* Search Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value); // Update the query state
          onSearch(e.target.value); // Trigger the search function
        }}
        placeholder={placeholder}
        className="ml-2 bg-transparent focus:outline-none w-full"
      />
    </div>
  );
}
