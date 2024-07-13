import AboutSectionOne from "@/components/About/AboutSectionOne";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ModalProductBag from "@/components/ModalProductBag";
import { fetchBrands } from "@/lib/data";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const brands = await fetchBrands();
  const session = await getServerSession(authConfig);

  return (
    <>
      <ModalProductBag />
      <ScrollUp />
      <Hero />
      <Features />
      <Brands brandsData={brands.pdata} />
      <AboutSectionOne />
      <Contact session={session} />
    </>
  );
}
