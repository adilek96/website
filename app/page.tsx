import AboutSectionOne from "@/components/About/AboutSectionOne";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ModalProductBag from "@/components/ModalProductBag";

export default function Home() {
  return (
    <>
      <ModalProductBag />
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
      <Contact />
    </>
  );
}
