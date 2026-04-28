import Link from "next/link";

const columns = [
  {
    title: "Properties",
    links: [
      { href: "/properties?type=sale", label: "For Sale" },
      { href: "/properties?type=rent", label: "For Rent" },
      { href: "/properties?propertyType=house", label: "Houses" },
      { href: "/properties?propertyType=apartment", label: "Apartments" },
      { href: "/listings/new", label: "List a Property" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/agents", label: "Our Agents" },
      { href: "/contact", label: "Contact" },
      { href: "/calculator", label: "Mortgage Calculator" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign In" },
      { href: "/register", label: "Create Account" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/favorites", label: "Saved Properties" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Estate<span className="text-accent">Prime</span></span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Your trusted partner in finding premium properties. Verified listings, certified agents, and the best prices — all in one place.
            </p>
            <div className="flex gap-3 mt-5">
              {["M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"
              ].map((d, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-accent text-xs uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex flex-wrap gap-6 text-sm text-white/50">
            <span>📍 123 Realty Blvd, Suite 400, San Francisco, CA 94105</span>
            <span>✉️ hello@estateprime.com</span>
            <span>📞 +1 (415) 555-0193</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {new Date().getFullYear()} EstatePrime. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
