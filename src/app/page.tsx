import Link from "next/link";
import PropertyCard, { type Property } from "@/components/PropertyCard";

const featured: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Penthouse",
    price: 1250000,
    type: "sale",
    beds: 3,
    baths: 2,
    sqft: 2100,
    address: "850 Market St",
    city: "San Francisco, CA",
    image: "",
    tag: "Featured",
  },
  {
    id: "2",
    title: "Spacious Mission District Home",
    price: 875000,
    type: "sale",
    beds: 4,
    baths: 3,
    sqft: 2800,
    address: "2340 Valencia St",
    city: "San Francisco, CA",
    image: "",
  },
  {
    id: "3",
    title: "Pacific Heights Luxury Apartment",
    price: 5500,
    type: "rent",
    beds: 2,
    baths: 2,
    sqft: 1400,
    address: "1820 Broadway",
    city: "San Francisco, CA",
    image: "",
    tag: "New",
  },
];

const stats = [
  { label: "Properties Listed", value: "12,400+" },
  { label: "Happy Clients", value: "8,200+" },
  { label: "Cities Covered", value: "120+" },
  { label: "Expert Agents", value: "340+" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">Your Trusted Real Estate Partner</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your <span className="text-accent">Dream Home</span> With Confidence
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed">
              Browse thousands of verified listings — houses, apartments, and commercial spaces — across top cities nationwide.
            </p>

            <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl shadow-xl">
              <input
                type="text"
                placeholder="Search by city, address, or ZIP..."
                className="flex-1 px-4 py-3 text-foreground rounded-xl outline-none text-sm bg-transparent placeholder:text-muted"
              />
              <select className="px-4 py-3 text-foreground rounded-xl outline-none text-sm bg-gray-50 border border-border">
                <option>All Types</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
              <Link
                href="/properties"
                className="bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Handpicked For You</p>
            <h2 className="text-3xl font-bold text-foreground">Featured Properties</h2>
          </div>
          <Link href="/properties" className="text-sm font-semibold text-primary hover:text-accent transition-colors hidden sm:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/properties" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
            View All Properties →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Why EstatePrime</p>
            <h2 className="text-3xl font-bold text-foreground">The Smarter Way to Buy &amp; Sell</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Verified Listings",
                desc: "Every property is verified by our team so you can browse with total confidence.",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Expert Agents",
                desc: "Our certified agents guide you through every step — from search to closing.",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Best Price Guarantee",
                desc: "We analyze market data to ensure you always get the best deal available.",
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-background border border-border">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-white/80 mb-8 text-lg">Join thousands of happy homeowners who found their dream property with EstatePrime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Browse Properties
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Talk to an Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
