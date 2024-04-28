const Pagination = () => {
  return (
    <>
      <div className="mx-2 mt-2 flex w-[80vw] flex-wrap justify-center rounded-sm p-2 dark:bg-primary dark:bg-opacity-5">
        <div className="flex flex-col items-center">
          <span className="text-gray-700 dark:text-gray-400 text-sm">
            Showing{" "}
            <span className="text-gray-900 font-semibold dark:text-white">
              1
            </span>{" "}
            to{" "}
            <span className="text-gray-900 font-semibold dark:text-white">
              10
            </span>{" "}
            of{" "}
            <span className="text-gray-900 font-semibold dark:text-white">
              100
            </span>{" "}
            Entries
          </span>
          <div className="mt-2 inline-flex xs:mt-0">
            <button className="flex h-8 items-center justify-center px-3  text-sm font-medium hover:opacity-70 ">
              <svg
                className="me-2 mr-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button className="flex h-8 items-center justify-center px-3  text-sm font-medium hover:opacity-70 ">
              Next
              <svg
                className="ms-2 ml-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
