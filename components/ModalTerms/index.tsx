const ModalTerms = () => {
  return (
    <>
      <div
        id="default-modal"
        className="fixed left-0 top-0 right-0 z-50  h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <div className="relative border-collapse rounded-lg border-body-color bg-white shadow dark:bg-modal">
            <div className=" flex items-center justify-between rounded-t border-b p-4 md:p-5">
              <h3 className="text-gray-900 text-xl font-semibold dark:text-white">
                Terms of Service
              </h3>
              <button
                type="button"
                className="text-gray-400 ms-auto dark:hover:bg-gray-600 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm hover:bg-body-color hover:text-body-color dark:hover:text-body-color"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-4 p-4 md:p-5">
              <p className=" text-base leading-relaxed">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className=" text-base leading-relaxed">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>

            <div className=" flex items-center justify-center rounded-b border-t p-4 md:p-5">
              <button
                type="button"
                className="  ease-in-up rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-opacity-90 hover:shadow-signUp "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTerms;
