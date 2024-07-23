"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSessionUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  birthday?: Date;
  image?: string;
}
interface ExtendedSession extends Session {
  user: ExtendedSessionUser;
}

export default function ProfileHeader({ ProfileLinks, type }) {
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: string;
  };
  const [role, setRole] = useState<string | undefined>();
  useEffect(() => {
    if (session) {
      setRole(session.user.role);
    }
  }, [session]);

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
                  isActive(item.path) ? "text-2xl" : "text-xl"
                }   dark:text-white sm:leading-tight`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
        {type === "main" && role === "Admin" ? (
          <li className="block">
            <Link
              href="/dashboard"
              className="text-xl font-bold  text-dark hover:opacity-70 dark:text-white "
            >
              Dashboard
            </Link>
          </li>
        ) : null}
        {type === "main" ? (
          <li className="md:hidden">
            <Link
              href="#"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xl font-bold  text-dark hover:opacity-70 dark:text-white "
            >
              Sign Out
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
