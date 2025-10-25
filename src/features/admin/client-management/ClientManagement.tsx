import { JSX } from "react";
import { ClientListTable } from "./component";

/**
 * Renders the Client Management section.
 *
 * This component displays a styled container that includes the client list table.
 * Used in admin or dashboard panels to manage client information.
 *
 * @returns {JSX.Element} The ClientManagement component.
 */
export function ClientManagement(): JSX.Element {
  return (
    <section className="flex flex-col gap-6 md:gap-8  border  border-gray-300 rounded-lg  bg-white p-4 ">
      <ClientListTable />
    </section>
  );
}
