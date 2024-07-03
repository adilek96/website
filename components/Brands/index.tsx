"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const brandsData: Brand[] = [
  {
    id: 1,
    name: "Hikvision",
    href: "https://hikvision.com",
    image: "/images/brands/hik.svg",
  },
  {
    id: 2,
    name: "Dahua",
    href: "https://dahua.com",
    image: "/images/brands/dahua.svg",
  },
  {
    id: 3,
    name: "Rubej",
    href: "https://rubej.com",
    image: "/images/brands/rubej.svg",
  },
  {
    id: 4,
    name: "Vers",
    href: "https://vers.com",
    image: "/images/brands/vers.svg",
  },
  {
    id: 5,
    name: "Tp-link",
    href: "https://tp-link.com",
    image: "/images/brands/tplink.svg",
  },
];

const Brands = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex flex-wrap items-center justify-center rounded-md bg-body-color  bg-opacity-30 px-8 py-8 dark:bg-primary dark:bg-opacity-5 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s
              "
            >
              <Swiper
                loop={true}
                slidesPerView={4}
                spaceBetween={10}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1080: { slidesPerView: 4 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 100 }}
                speed={900}
                className=" h-full w-full"
              >
                {brandsData.map((brand, i) => (
                  <SwiperSlide key={i}>
                    <SingleBrand key={brand.id} brand={brand} />
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
    <div className="mx-3 flex w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className=" relative h-10 w-full transition-all duration-300 hover:opacity-50"
      >
        <Image src={image} alt={name} fill />
      </a>
    </div>
  );
};
