"use client";
import Camera from "@/public/images/camera/camera";
import Monitor from "@/public/images/monitor/monitor";
import Image from "next/image";
import Link from "next/link";
import Rive from "@rive-app/react-canvas";
import { useRive } from "@rive-app/react-canvas";

const Hero = () => {
  const { rive, RiveComponent } = useRive({
    src: "./anime.riv",
    stateMachines: "state",
    autoplay: true,
  });
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight ">
                  The best solutions for your safety!
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  We provide the best solutions in the field of security and
                  video surveillance systems, we will help with selection and
                  installation.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/products"
                    className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    See products
                  </Link>
                  <Link
                    href="/services"
                    className="rounded-md bg-black/20 px-8 py-4 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                  >
                    Get services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 z-[-1] h-[500px] w-[500px] opacity-30 lg:opacity-0 ">
          <RiveComponent />
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] h-[500px] w-[500px] opacity-30 lg:opacity-100">
          {/* <Rive src="./anime.riv" /> */}
        </div>
      </section>
    </>
  );
};

export default Hero;
