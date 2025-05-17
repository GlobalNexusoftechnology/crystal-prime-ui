import { SearchBar } from "../search-bar";
import { MenuIcon } from "@/features";

interface AdminHeaderProps {
  SetIsVisibleSidebar: () => void;
}

/**
 * AdminHeader component for the admin panel.
 * Displays a menu button, search bar, notifications, and user profile dropdown.
 *
 * @component
 * @param {AdminHeaderProps} props - The component props.
 * @param {Function} props.SetIsVisibleSidebar - Function to toggle the sidebar visibility.
 * @returns {JSX.Element} The rendered AdminHeader component.
 */
export function AdminHeader({ SetIsVisibleSidebar }: AdminHeaderProps) {
  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white shadow-sm px-4 md:px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw]">
      {/* Left: Menu + SearchBar */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700" onClick={SetIsVisibleSidebar}>
          <MenuIcon className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]" />
        </button>
        <SearchBar onSearch={(query) => console.log("Searching:", query)} bgColor="customGray"/>
      </div>
    </header>
  );
}
