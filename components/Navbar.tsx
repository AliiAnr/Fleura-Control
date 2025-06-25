import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image"; // Assuming you have an Image component for the logo
import { Input } from "./tremor/Input";

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Product", href: "/products" },
  { label: "Store", href: "/stores" },
  { label: "Sale", href: "/sales" },
  { label: "User", href: "/users" },
];

export default function Navbar() {
  return (
    <nav className="h-screen w-64 top-0 bg-[#F06AA8] sticky text-white flex flex-col py-8 px-4">
      <div className="mb-8 flex items-center space-x-4">
        <Image src="/images/icon.png" alt="logo" width={50} height={50} />
        <p className="text-[1.5rem]">Fleura</p>
      </div>
      <div>
        <Input placeholder="Search" type="search" className="mb-4" />
      </div>
      <ul className="flex-1 space-y-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block py-2 px-4 rounded hover:bg-[#A2014B] transition"
            >
              {item.icon && <span className="mr-2 text-[1.75rem]">{item.icon}</span>}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
