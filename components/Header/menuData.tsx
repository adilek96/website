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
    submenu: [],
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
