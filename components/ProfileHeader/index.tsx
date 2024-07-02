"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ProfileHeader({ ProfileLinks }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  return (
    <div className="mx-5 flex items-center justify-center ">
      <ul className=" flex w-full flex-wrap items-end  justify-center gap-8">
        {ProfileLinks.map((item) => {
          return (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`mb-8  font-bold leading-tight text-black transition-all duration-300 hover:opacity-70 ${
                  isActive(item.path) ? "text-2xl" : "text - xl"
                }   dark:text-white sm:leading-tight`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
        <li className="md:hidden">
          <Link
            href="#"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="font-bold text-dark  hover:opacity-70 dark:text-white  "
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}
