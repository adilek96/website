"use client";

export default function ProductsTable({ products }) {
  //   const deleteUser = async (email: any) => {
  //     if (email === session.data.user.email) {
  //       return false;
  //     }
  //     try {
  //       const response = await fetch("/api/allUsers", {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //       }

  //       const result = await response.json();

  //       console.log(result.message);
  //       location.reload();
  //     } catch (error) {
  //       console.error("Ошибка при удалении пользователя:", error);
  //     }
  //   };

  return (
    <div className="mt-5 px-4">
      <div className="relative overflow-x-auto">
        <table className=" w-full text-left text-sm rtl:text-right">
          <thead className="  text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Characteristics
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Subcategory
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product: any) => (
              <tr key={product.name} className=" border-b">
                <th
                  scope="row"
                  className=" whitespace-nowrap px-6 py-4 font-medium "
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.characteristics}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.subcategory}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.image}</td>
                <td
                  //   onClick={(e) => deleteUser(user.email)}
                  className="cursor-pointer px-6 py-4"
                >
                  <svg
                    className="h-6 w-6 text-red "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
