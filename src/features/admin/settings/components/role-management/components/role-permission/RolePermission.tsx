export function RolePermission({ permissions }: { permissions: string[] }) {
  return (
    <div className="flex flex-col gap-4 2xl:gap-[0.5vw] py-4 2xl:py-[1vw] px-8 2xl:px-[2vw] bg-white">
      <h1 className="2xl:text-[1vw] text-gray-700 font-semibold bg-white">
        Permissions
      </h1>
      <table className="w-full text-[1rem] 2xl:text-[1vw]">
        <thead className="bg-white">
          <tr>
            <th className="p-2 2xl:p-[0.5vw] text-left text-gray-700">Modules</th>
            <th className="p-2 2xl:p-[0.5vw] text-left text-gray-700">Read Only</th>
            <th className="p-2 2xl:p-[0.5vw] text-left text-gray-700">Edit</th>
            <th className="p-2 2xl:p-[0.5vw] text-left text-gray-700">Add</th>
            <th className="p-2 2xl:p-[0.5vw] text-left text-gray-700">Delete</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-150 bg-white text-[1rem] 2xl:text-[1vw]"
            >
              <td className="p-2 2xl:p-[0.5vw]">{item}</td>
              <td className="p-2 2xl:p-[0.5vw]">{"No"}</td>
              <td className="p-2 2xl:p-[0.5vw]">{"No"}</td>
              <td className="p-2 2xl:p-[0.5vw]">{"No"}</td>
              <td className="p-2 2xl:p-[0.5vw]">{"No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
