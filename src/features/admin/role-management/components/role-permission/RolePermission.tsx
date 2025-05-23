interface Permission {
  module: string;
  read: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
}

export function RolePermission({
  permissions,
}: {
  permissions: Permission[];
}) {
  return (
    <div className="p-4">
      <table className="w-full text-[1rem] 2xl:text-[1vw]">
        <thead className="bg-white">
          <tr>
            <th className="p-2 text-gray-700">Modules</th>
            <th className="p-2 text-gray-700">Read Only</th>
            <th className="p-2 text-left text-gray-700">Edit</th>
            <th className="p-2 text-left text-gray-700">Add</th>
            <th className="p-2 text-left text-gray-700">Delete</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-150 bg-white text-[1rem] 2xl:text-[1vw]"
            >
              <td className="p-2">{perm.module}</td>
              <td className="p-2">{perm.read ? "Yes" : "No"}</td>
              <td className="p-2">{perm.edit ? "Yes" : "No"}</td>
              <td className="p-2">{perm.add ? "Yes" : "No"}</td>
              <td className="p-2">{perm.delete ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
