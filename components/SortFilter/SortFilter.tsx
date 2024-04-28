const SortFilter = () => {
  return (
    <>
      <div className=" mx-2 flex w-[80vw] flex-wrap justify-end rounded-sm p-2 dark:bg-primary dark:bg-opacity-5">
        <div className="flex w-16 justify-between">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:opacity-70 dark:hover:bg-modal">
            <svg
              className="text-gray-800 h-6 w-6 dark:text-white"
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
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"
              />
            </svg>
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:opacity-70 dark:hover:bg-modal">
            <svg
              className="text-gray-800 h-6 w-6 dark:text-white"
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
                d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default SortFilter;
