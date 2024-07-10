"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const Brands = ({ brandsData }) => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-wrap items-center justify-center rounded-md bg-body-color  bg-opacity-10 px-8 py-8 dark:bg-primary dark:bg-opacity-5 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s
              "
            >
              <Swiper
                loop={true}
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1080: { slidesPerView: 4 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 500 }}
                speed={900}
                centeredSlides={true}
                className="h-full w-full  "
              >
                {brandsData.map((brand, i) => (
                  <SwiperSlide key={i}>
                    <SingleBrand key={brand._id} brand={brand} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="relative flex h-16 w-full items-center justify-center self-center transition-all duration-300 hover:opacity-50">
      <Image src={image} alt={name} fill />
    </div>
  );
};
