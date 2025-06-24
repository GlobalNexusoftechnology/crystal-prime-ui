import { ClientListTable } from "./component";

/**
 * ClientManagement component displays the client management section of the application.
 * 
 * It includes:
 * - A heading with an icon labeled "Client Management"
 * - A table of clients rendered by the `ClientListTable` component
 *
 * This component is styled using Tailwind CSS with responsive and 2XL-specific spacing.
 */
export function ClientManagement() {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border 2xl:border-[0.1vw] border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <ClientListTable/>
    </section>
  );
}
