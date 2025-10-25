"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { UserButton, useUser } from "@stackframe/stack";

export default function Header() {
  const user = useUser();

  const links = [
    { to: "/", label: "Home" },
    { to: "/globe", label: "Globe" },
  ] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <UserButton />
          ) : (
            <div className="flex gap-2">
              <Link
                href="/sign-in"
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
