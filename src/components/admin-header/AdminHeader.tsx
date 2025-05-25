import { SearchBar } from "../search-bar";
import { MenuIcon, NotificationIcon } from "@/features";
import { UserDropdown } from "../user-dropdown";
import { ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";

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
  const {activeSession} = useAuthStore()
  const userName = `${activeSession?.user?.first_name} ${activeSession?.user?.last_name}`
  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white shadow-sm px-4 md:px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw]">
      {/* Left: Menu + SearchBar */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700 flex xl:hidden" onClick={SetIsVisibleSidebar}>
          <MenuIcon className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]" />
        </button>
        <SearchBar
          onSearch={(query) => console.log("Searching:", query)}
          bgColor="customGray"
        />
      </div>
      <div className="flex items-center gap-4 2xl:gap-[1vw]">
        <div className="cursor-pointer border 2xl:border-[0.1vw] bg-customGray border-gray-300 p-2 2xl:p-[0.5vw] rounded-xl 2xl:rounded-[0.75vw]">
          <NotificationIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
        </div>
        <UserDropdown
        name={userName}
        image={ImageRegistry.profileImage} 
      />
      </div>
    </header>
  );
}
