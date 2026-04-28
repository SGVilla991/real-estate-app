import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PropertyCard, { type Property } from "@/components/PropertyCard";
import { getFavoriteIds } from "@/app/actions/favorites";
import HomeSearch from "@/components/HomeSearch";

const SEED: Property[] = [
  { id: "1", title: "Modern Downtown Penthouse", price: 1250000, type: "sale", property_type: "penthouse", beds: 3, baths: 2, sqft: 2100, parking: 1, address: "850 Market St", city: "San Francisco, CA", neighborhood: "Downtown", image: "", tag: "Featured" },
  { id: "2", title: "Spacious Mission District Home", price: 875000, type: "sale", property_type: "house", beds: 4, baths: 3, sqft: 2800, parking: 2, address: "2340 Valencia St", city: "San Francisco, CA", neighborhood: "Mission District", image: "" },
  { id: "3", title: "Pacific Heights Luxury Apartment", price: 5500, type: "rent", property_type: "apartment", beds: 2, baths: 2, sqft: 1400, parking: 1, address: "1820 Broadway", city: "San Francisco, CA", neighborhood: "Pacific Heights", image: "", tag: "New" },
];

async function getProperties(limit = 6) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (!data || data.length === 0) return SEED.slice(0, limit);
    return data.map((r) => ({
      id: String(r.id), title: r.title, price: r.price,
      type: r.type as "sale" | "rent", property_type: r.property_type,
      beds: r.beds, baths: r.baths, sqft: r.sqft, parking: r.parking,
      address: r.address, city: r.city, neighborhood: r.neighborhood,
      image: r.image_url ?? "", tag: r.tag ?? undefined,
    }));
  } catch { return SEED.slice(0, limit); }
}

async function getUser() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch { return null; }
}

const propertyTypes = [
  { label: "Houses", type: "house", icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", count: "2,400+" },
  { label: "Apartments", type: "apartment", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z", count: "5,100+" },
  { label: "Offices", type: "office", icon: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z", count: "840+" },
  { label: "Commercial", type: "commercial", icon: "M2 20h2v-4h16v4h2V8l-8-6-8 6v12zm10-14.8L18 9.6V14H6V9.6l6-4.4z", count: "1,200+" },
  { label: "Land", type: "land", icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", count: "620+" },
];

const cities = [
  { name: "San Francisco", state: "CA", listings: "1,240", color: "from-blue-600 to-blue-800" },
  { name: "Los Angeles", state: "CA", listings: "2,850", color: "from-orange-500 to-red-600" },
  { name: "New York", state: "NY", listings: "4,100", color: "from-gray-600 to-gray-800" },
  { name: "Miami", state: "FL", listings: "1,920", color: "from-teal-500 to-cyan-700" },
  { name: "Austin", state: "TX", listings: "1,380", color: "from-green-600 to-emerald-800" },
  { name: "Chicago", state: "IL", listings: "2,200", color: "from-purple-600 to-indigo-800" },
];

const testimonials = [
  { name: "Sarah M.", role: "First-time buyer", text: "EstatePrime made finding our family home incredibly simple. The search tools are far better than anything else I've used.", rating: 5 },
  { name: "James R.", role: "Real estate investor", text: "I've closed four investment properties through EstatePrime. The agent network and verified listings save me so much time.", rating: 5 },
  { name: "Priya K.", role: "Renter", text: "Found my dream apartment in two weeks. The filtering and neighborhood guides were exactly what I needed.", rating: 5 },
];

const steps = [
  { n: "01", title: "Search & Filter", desc: "Browse 12,000+ verified listings. Filter by type, price, location, amenities, and more." },
  { n: "02", title: "Connect with Agents", desc: "Get matched with a certified local agent who knows your target neighborhood inside out." },
  { n: "03", title: "Close & Move In", desc: "Our team guides you through every step of the closing process. Then celebrate your new home." },
];

export default async function HomePage() {
  const [properties, user, favoriteIds] = await Promise.all([
    getProperties(6),
    getUser(),
    getFavoriteIds(),
  ]);

  const featured = properties.slice(0, 3);
  const latest = properties.slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/80 text-sm">12,400+ verified properties nationwide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Find Your Next<br /><span className="text-accent">Dream Property</span>
            </h1>
            <p className="text-white/65 text-lg mb-10 max-w-2xl leading-relaxed">
              Buy, sell, or rent with confidence. EstatePrime connects you with premium listings and certified agents across 120+ cities.
            </p>
            <HomeSearch />
          </div>
        </div>
      </section>

      {/* ── Property Types ───────────────────────────────── */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {propertyTypes.map((t) => (
              <Link
                key={t.type}
                href={`/properties?propertyType=${t.type}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-background transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/8 group-hover:bg-primary/15 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d={t.icon} />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-foreground">{t.label}</span>
                <span className="text-xs text-muted">{t.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "12,400+", l: "Active Listings" },
              { v: "8,200+", l: "Happy Clients" },
              { v: "120+", l: "Cities Covered" },
              { v: "$4.2B+", l: "Total Transactions" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-accent">{s.v}</p>
                <p className="text-sm text-white/60 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-accent font-semibold text-xs uppercase tracking-widest">Handpicked</span>
            <h2 className="text-3xl font-bold text-foreground mt-1">Featured Properties</h2>
          </div>
          <Link href="/properties" className="text-sm font-semibold text-primary hover:text-accent transition-colors hidden sm:flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} isFavorited={favoriteIds.includes(p.id)} isLoggedIn={!!user} />
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="bg-surface border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-border" />
            {steps.map((s, i) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg relative z-10">
                  <span className="text-2xl font-bold text-accent">{i + 1}</span>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Cities ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-accent font-semibold text-xs uppercase tracking-widest">Explore</span>
            <h2 className="text-3xl font-bold text-foreground mt-1">Popular Cities</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((c) => (
            <Link
              key={c.name}
              href={`/properties?city=${encodeURIComponent(c.name)}`}
              className={`relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br ${c.color} group`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="text-white font-bold text-sm">{c.name}</p>
                <p className="text-white/70 text-xs">{c.state} · {c.listings} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest Listings ──────────────────────────────── */}
      <section className="bg-surface border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-widest">Fresh on Market</span>
              <h2 className="text-3xl font-bold text-foreground mt-1">Latest Listings</h2>
            </div>
            <Link href="/properties?sort=newest" className="text-sm font-semibold text-primary hover:text-accent transition-colors hidden sm:flex items-center gap-1">
              See All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((p) => (
              <PropertyCard key={p.id} property={p} isFavorited={favoriteIds.includes(p.id)} isLoggedIn={!!user} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mortgage Calculator CTA ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-10 lg:p-14">
              <span className="text-accent font-semibold text-xs uppercase tracking-widest">Free Tool</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Mortgage Calculator</h2>
              <p className="text-white/65 leading-relaxed mb-6">
                Estimate your monthly payments in seconds. Adjust down payment, interest rate, and loan term to find what works for your budget.
              </p>
              <Link href="/calculator" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Calculate Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center bg-primary-light/30 p-10">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-xs text-white space-y-3">
                <div className="flex justify-between text-sm"><span className="text-white/60">Home Price</span><span className="font-semibold">$850,000</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Down Payment</span><span className="font-semibold">20%</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Interest Rate</span><span className="font-semibold">6.5%</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Loan Term</span><span className="font-semibold">30 years</span></div>
                <div className="border-t border-white/20 pt-3 flex justify-between">
                  <span className="text-white/60 text-sm">Monthly Payment</span>
                  <span className="text-accent text-xl font-bold">$4,299</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="bg-surface border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-xs uppercase tracking-widest">Client Stories</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background border border-border rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent fill-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── List CTA ─────────────────────────────────────── */}
      <section className="bg-accent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to List Your Property?</h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Reach thousands of qualified buyers and renters. Listing is fast, easy, and free to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings/new" className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              List for Free
            </Link>
            <Link href="/agents" className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Meet Our Agents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
