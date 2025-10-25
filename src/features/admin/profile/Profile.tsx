import { PersonalInfo } from "./components";

/**
 * Profile component
 *
 * Displays the user's profile section, including personal information.
 * Renders a styled container with a heading and the <PersonalInfo /> component.
 */
export function Profile() {
  return (
    <section className="flex flex-col  border border-gray-300 rounded-lg  bg-white p-4 ">
      <h1 className="text-xl  font-semibold mb-8">
        My Profile
      </h1>
      <div className="flex flex-col  border border-gray-300 rounded-lg  bg-[#F8F8F8]">
        <PersonalInfo />
      </div>
    </section>
  );
}
