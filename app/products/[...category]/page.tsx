export default function Category({ params }: { params: { category: string } }) {
  return (
    <>
      <section className="overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {params.category}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
