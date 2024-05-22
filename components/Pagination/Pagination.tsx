"use effect";
import { paginationState } from "@/store/paginationStore";

const Pagination = ({ totalCount }) => {
  const currentPage = paginationState((state) => state.currentPage);
  const setCurrentPage = paginationState((state) => state.setCurrentPage);

  const pages = Math.ceil(totalCount / 10);

  return (
    <nav className="flex items-center justify-center gap-1">
      <button
        onClick={() => setCurrentPage(+currentPage - 1)}
        disabled={currentPage === 1}
        className="  flex h-8 items-center justify-center rounded-sm  bg-body-color bg-opacity-20 px-3 leading-tight text-black dark:text-white dark:hover:text-body-color"
      >
        &lsaquo;
      </button>
      <ul className="inline-flex -space-x-px text-sm">
        {[...Array(pages)].map((_, i) => (
          <li key={i}>
            <button
              className={`flex h-8 items-center justify-center rounded-sm bg-body-color bg-opacity-20 px-3 leading-tight text-black dark:text-white dark:hover:text-body-color ${
                currentPage === i + 1 ? "font-bold" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCurrentPage(+currentPage + 1)}
        disabled={currentPage === pages}
        className=" flex h-8 items-center justify-center rounded-sm  bg-body-color bg-opacity-20 px-3 leading-tight text-black dark:text-white dark:hover:text-body-color"
      >
        &rsaquo;
      </button>
    </nav>
  );
};

export default Pagination;
