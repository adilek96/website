"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ImageSwiper({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[350px] w-full rounded-sm"
      >
        {images.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={img}
                  alt={"img"}
                  fill
                  className="block h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-5 h-[80px] w-full rounded-sm"
      >
        {images.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt="Product Image"
                width={80}
                height={80}
                className="block h-full w-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
