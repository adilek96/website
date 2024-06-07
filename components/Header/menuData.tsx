import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    _id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    _id: 2,
    title: "Products",
    newTab: false,
    submenu: [
      // {
      //   id: 41,
      //   title: "All products",
      //   path: "/products",
      //   newTab: false,
      // },
      // {
      //   id: 42,
      //   title: "Computers",
      //   path: `/products/computers`,
      //   newTab: false,
      // },
      // {
      //   id: 43,
      //   title: "Laptops",
      //   path: "/products/laptops",
      //   newTab: false,
      // },
      // {
      //   id: 44,
      //   title: "CCTV solution",
      //   path: "/products/cctv-solution",
      //   newTab: false,
      //   submenu: [
      //     {
      //       id: 1,
      //       title: "Camera",
      //       path: "/products/cctv-solution/camera",
      //       newTab: false,
      //     },
      //     {
      //       id: 2,
      //       title: "DVR",
      //       path: "/products/cctv-solution/dvr",
      //       newTab: false,
      //     },
      //   ],
      // },
      // {
      //   id: 45,
      //   title: "Audio systems",
      //   path: "/products/audio-systems",
      //   newTab: false,
      // },
      // {
      //   id: 46,
      //   title: "Security and fire alarm system",
      //   path: "/products/security-and-fire-alarm-system",
      //   newTab: false,
      // },
    ],
  },
  {
    _id: 3,
    title: "Services",
    path: "/services",
    newTab: false,
  },
  {
    _id: 4,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    _id: 5,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
