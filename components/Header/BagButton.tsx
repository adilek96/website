const BagButton = () => {
  return (
    <button className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black hover:opacity-70 dark:text-white md:h-14 md:w-14">
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
          d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
        />
      </svg>

      <div className="absolute top-0 right-3 flex h-3 w-3 items-center justify-center rounded-full bg-yellow text-[8px] md:top-1 md:right-[22px]">
        <p>0</p>
      </div>
    </button>
  );
};

export default BagButton;
