import { MdAccountCircle } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";

export const links = [
  {
    id: 1,
    url: "/",
    text: "home",
  },
  {
    id: 2,
    url: "/products",
    text: "Stickers",
  },
  {
    id: 3,
    url: "/about",
    text: "About",
  },
  {
    id: 4,
    url: "/contact",
    text: "Contact",
  },
  {
    id: 5,
    url: "/login",
    text: "Account / Sign In",
  },
  {
    id: 6,
    url: "/cart",
    text: "Cart",
  },
];

export const icons = [
  {
    id: 1,
    url: "/login",
    icon: <MdAccountCircle />,
    text: "Account / Sign In",
  },
  {
    id: 2,
    url: "/cart",
    icon: <FaOpencart />,
    text: "Cart",
  },
];


