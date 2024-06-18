"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileHeader({ ProfileLinks }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  return (
    <div>
      <ul className="flex w-full items-end gap-8">
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
      </ul>
    </div>
  );
}
