"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type Props = { user: { email: string; name: string } | null };

export default function NavbarClient({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) router.push(`/properties?city=${encodeURIComponent(search.trim())}`);
  }

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">Estate<span className="text-accent">Prime</span></span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city or neighborhood..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors bg-background"
              />
            </div>
          </form>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Auth actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <Link href="/listings/new" className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-accent-dark transition-colors">
                  + List
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border hover:bg-background transition-colors">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground truncate max-w-24">{user.name || user.email.split("@")[0]}</span>
                </Link>
                <form action={logout}>
                  <button type="submit" className="text-sm font-medium text-muted hover:text-red transition-colors px-2 py-2">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-foreground hover:text-primary transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link href="/register" className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-primary-light transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="px-4 py-3 space-y-1">
            <form onSubmit={handleSearch} className="mb-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city or neighborhood..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-border outline-none focus:border-primary bg-background"
              />
            </form>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block text-sm font-medium text-foreground hover:text-primary py-2.5 px-1">
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link href="/listings/new" onClick={() => setOpen(false)}
                className="bg-accent text-white text-sm font-bold px-4 py-3 rounded-xl text-center hover:bg-accent-dark">
                + List Property
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}
                    className="border border-border text-sm font-semibold px-4 py-3 rounded-xl text-center text-foreground hover:bg-background">
                    Dashboard
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="w-full text-sm font-medium text-muted py-2">Sign Out</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}
                    className="border border-border text-sm font-semibold px-4 py-3 rounded-xl text-center text-foreground hover:bg-background">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}
                    className="bg-primary text-white text-sm font-bold px-4 py-3 rounded-xl text-center hover:bg-primary-light">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
