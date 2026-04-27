"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type Props = {
  user: { email: string; name: string } | null;
};

export default function NavbarClient({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Estate</span>
            <span className="text-2xl font-bold text-accent">Prime</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/listings/new"
                  className="bg-accent text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-accent-light transition-colors"
                >
                  + List Property
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted truncate max-w-32" title={user.email}>
                    {user.name || user.email}
                  </span>
                  <form action={logout}>
                    <button type="submit" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                      Sign Out
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/listings/new"
                  className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-primary-light transition-colors"
                >
                  List Property
                </Link>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 pt-2 pb-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground hover:text-accent py-2"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/listings/new"
              className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              List Property
            </Link>
            {user ? (
              <form action={logout}>
                <button type="submit" className="text-sm font-medium text-foreground w-full text-left py-2">
                  Sign Out ({user.name || user.email})
                </button>
              </form>
            ) : (
              <Link href="/login" className="text-sm font-medium text-foreground py-2" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
