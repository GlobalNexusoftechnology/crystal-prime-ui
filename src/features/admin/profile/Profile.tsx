import { PersonalInfo } from "./components";

/**
 * Profile component
 *
 * Displays the user's profile section, including personal information.
 * Renders a styled container with a heading and the <PersonalInfo /> component.
 */
export function Profile() {
  return (
    <section className="flex flex-col  border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      <h1 className="text-xl 2xl:text-[1.25vw] font-semibold mb-8 2xl:mb-[2vw]">
        My Profile
      </h1>
      <div className="flex flex-col  border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-[#F8F8F8]">
        <PersonalInfo />
      </div>
    </section>
  );
}
