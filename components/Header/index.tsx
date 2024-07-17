"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import BagButton from "./BagButton";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { Menu } from "@/types/menu";
import ShoppingCard from "../ShoppingCard";
import Loading from "@/app/loading";
import ProfileIcon from "@/public/images/profileIcon/ProfileIcon";
import LanguageIcon from "@/public/images/language/LanguageIcon";
import SearchIcon from "@/public/images/search/SearchIcon";
import Search from "../Search";
import { totalQuantityState } from "@/store/shoppingBagState";

const Header = () => {
  const [menu, setMenu] = useState<Menu[]>(menuData);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [shopCardTrigger, setShopCardTrigger] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalQuantity = totalQuantityState((state) => state.totalQuantity);

  const session = useSession();

  useEffect(() => {
    const fetchSubmenuData = async () => {
      try {
        const response = await axios.get("/api/category");
        const submenuData = response.data;

        // Обновление подкатегорий в разделе "Products"
        const updatedMenu = menu.map((item) => {
          if (item.title === "Products") {
            return {
              ...item,
              submenu: Array.isArray(submenuData.data) ? submenuData.data : [],
            };
          }
          return item;
        });

        setMenu(updatedMenu);
      } catch (error) {
        console.error("Failed to fetch submenu data:", error);
      }
    };

    fetchSubmenuData();
  }, []);

  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-50 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container relative">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  priority
                  className="w-full dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  priority
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-50 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full w-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block  lg:flex lg:space-x-12">
                    {menu.map((menuItem, index) => (
                      <li key={menuItem._id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6`}
                            onClick={() => setNavbarOpen(false)}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <a
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </a>
                            <div
                              className={`submenu relative left-0 top-full z-50 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              <Suspense fallback={<Loading />}>
                                {Array.isArray(menuItem.submenu) &&
                                  menuItem.submenu.map((submenuItem) => (
                                    <Link
                                      href={submenuItem.path}
                                      key={submenuItem._id}
                                      className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
                                      onClick={() => setNavbarOpen(false)}
                                    >
                                      {submenuItem.title}
                                    </Link>
                                  ))}
                              </Suspense>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex h-10 items-center justify-center gap-4 md:hidden">
                    <div className="self-center md:hidden">
                      <LanguageIcon />
                    </div>
                    <div className=" h-10 w-10 self-center  rounded-full shadow-2xl">
                      <Link
                        href={session?.data ? "/profile" : "/signin"}
                        className=" hover:bg-opacity-90 md:hidden"
                        onClick={navbarToggleHandler}
                      >
                        <ProfileIcon />
                      </Link>
                    </div>
                    <div className="self-center md:hidden">
                      <ThemeToggler />
                    </div>
                  </div>
                </nav>
              </div>

              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <div className="flex items-center justify-center">
                  <Link
                    href="#"
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="ml-8  font-bold text-dark hover:opacity-70 dark:text-white"
                  >
                    <SearchIcon />
                  </Link>
                </div>
                {session?.data ? (
                  <>
                    <Link
                      href="#"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="hidden px-5 py-3  text-sm font-bold text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Sign Out
                    </Link>
                    <Link
                      href="/profile"
                      className="ease-in-up hidden rounded-md bg-primary px-3 py-3 text-sm font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-3 lg:px-3 xl:px-4"
                    >
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="hidden px-7 py-3 text-sm font-bold text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="ease-in-up hidden rounded-md bg-primary px-3 py-3 text-sm font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-3 lg:px-3 xl:px-4"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                <div className="flex items-center justify-center">
                  <div
                    onClick={() => setShopCardTrigger(!shopCardTrigger)}
                    className="group "
                  >
                    <BagButton totalQuantity={totalQuantity} />
                  </div>
                  <div className="hidden  md:block">
                    <ThemeToggler />
                  </div>
                  <div className="bg-gray-2  dark:bg-dark-bg hidden h-7 w-7 cursor-pointer items-center justify-center rounded-full text-black hover:opacity-70 dark:text-white md:flex md:h-14 md:w-14">
                    <LanguageIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`submenu  absolute right-3 z-50 rounded-md  bg-white   p-4 opacity-0 shadow-lg transition-[top]  duration-300 dark:bg-dark lg:right-32  ${
            shopCardTrigger ? "visible top-[100%]   opacity-100" : "invisible"
          }`}
        >
          <ShoppingCard setShopCardTrigger={setShopCardTrigger} />
        </div>
        <div
          className={`absolute right-0 z-20 w-full  rounded-md    opacity-0 shadow-lg  transition-[top] duration-300   ${
            searchOpen ? "visible top-[100%]   opacity-100" : "invisible"
          }`}
        >
          <Search setSearchOpen={setSearchOpen} />
        </div>
      </header>
    </>
  );
};

export default Header;
