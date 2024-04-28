import SortFilter from "@/components/SortFilter/SortFilter";
import Pagination from "@/components/Pagination/Pagination";
import ProductCard from "@/components/ProductCards/ProductCard";

const Products = () => {
  return (
    <>
      <section className="overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className="mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  All Products
                </h2>
                <SortFilter />
                <div className="my-10 flex w-[80wv] flex-wrap">
                  <ProductCard />
                </div>

                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
