import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image"; // Assuming you have an Image component for the logo
// import { Input } from "./tremor/Input";
import { usePathname } from "next/navigation"; // ⬅️ Import hook ini

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Product", href: "/products" },
  { label: "Store", href: "/stores" },
  { label: "Sale", href: "/sales" },
  { label: "User", href: "/users" },
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
                className={`block py-2 px-4 rounded transition ${
                  isActive ? "bg-[#A2014B]" : "hover:bg-[#A2014B]"
                }`}
              >
                {item.icon && (
                  <span className="mr-2 text-[1.75rem]">{item.icon}</span>
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
