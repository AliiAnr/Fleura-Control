import Link from "next/link";

import Image from "next/image"; // Assuming you have an Image component for the logo
// import { Input } from "./tremor/Input";
import { usePathname } from "next/navigation"; // ⬅️ Import hook ini

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/images/nav/dashboard.svg" },
  { label: "Product", href: "/products", icon: "/images/nav/product.svg" },
  { label: "Store", href: "/stores", icon: "/images/nav/store.svg" },
  { label: "Sale", href: "/sales", icon: "/images/nav/sale.svg" },
  { label: "User", href: "/users", icon: "/images/nav/user.svg" },
];

export default function Navbar() {
  const pathname = usePathname(); // ⬅️ Ambil path saat ini
  return (
    <nav className="h-screen w-64 top-0 bg-[#F06AA8] sticky text-white flex flex-col py-8 px-4">
      <div className="mb-8 flex items-center space-x-4">
        <Image src="/images/icon.png" alt="logo" width={50} height={50} />
        <p className="text-[1.5rem]">Fleura</p>
      </div>

      <ul className="flex-1 space-y-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 py-2 px-4 rounded transition ${
                  isActive ? "bg-[#A2014B]" : "hover:bg-[#A2014B]"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label + " icon"}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
