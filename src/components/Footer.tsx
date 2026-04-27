import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">Estate</span>
              <span className="text-2xl font-bold text-accent">Prime</span>
            </div>
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Your trusted partner in finding the perfect home. We connect buyers, sellers, and renters with premium properties.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/properties", label: "Properties" },
                { href: "/agents", label: "Our Agents" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>123 Realty Blvd, Suite 400</li>
              <li>San Francisco, CA 94105</li>
              <li className="pt-2">hello@estateprime.com</li>
              <li>+1 (415) 555-0193</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} EstatePrime. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-white/50">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
