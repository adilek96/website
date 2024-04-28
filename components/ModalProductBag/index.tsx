const ModalProductBag = () => {
  return (
    <>
      <div
        className={` relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full`}
      >
        <div className="w-[300px]"></div>
      </div>
    </>
  );
};

export default ModalProductBag;
