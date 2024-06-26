import { fetchUsers } from "@/lib/data";
import DeleteSvg from "@/public/images/delete/DeleteSvg";
import { deleteUserAction } from "@/app/action/deleteUserAction";

export default async function DashboardUsers() {
  const { users } = await fetchUsers();

  return (
    <div>
      <h1 className="mt-5 text-center text-[30px]">Users</h1>
      <div className="mt-5 px-4">
        <div className="relative overflow-x-auto">
          <table className=" w-full text-left text-sm rtl:text-right">
            <thead className="  text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Create Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Update Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.email} className=" border-b">
                  <th
                    scope="row"
                    className=" whitespace-nowrap px-6 py-4 font-medium "
                  >
                    {user.email}
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.createdAt}</td>
                  <td className="px-6 py-4">{user.createdAt}</td>
                  <td className="cursor-pointer px-6 py-4">
                    <form action={deleteUserAction}>
                      <input type="hidden" name="delete" value={user._id} />
                      <button type="submit">
                        <DeleteSvg />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
