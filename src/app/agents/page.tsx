import Link from "next/link";

const agents = [
  { id: 1, name: "Sarah Mitchell", title: "Senior Listing Agent", sales: 142, rating: 4.9, city: "San Francisco, CA", specialty: "Luxury Homes", initials: "SM", color: "bg-blue-600" },
  { id: 2, name: "Carlos Rivera", title: "Buyer's Specialist", sales: 98, rating: 4.8, city: "Oakland, CA", specialty: "First-Time Buyers", initials: "CR", color: "bg-emerald-600" },
  { id: 3, name: "Jennifer Lau", title: "Luxury Properties Expert", sales: 210, rating: 5.0, city: "Palo Alto, CA", specialty: "Investment Properties", initials: "JL", color: "bg-purple-600" },
  { id: 4, name: "Marcus Johnson", title: "Commercial Real Estate", sales: 77, rating: 4.7, city: "San Jose, CA", specialty: "Commercial & Office", initials: "MJ", color: "bg-orange-600" },
  { id: 5, name: "Priya Patel", title: "Relocation Specialist", sales: 133, rating: 4.9, city: "San Francisco, CA", specialty: "Corporate Relocation", initials: "PP", color: "bg-rose-600" },
  { id: 6, name: "Tom Whitfield", title: "Investment Properties", sales: 165, rating: 4.8, city: "Berkeley, CA", specialty: "Multi-Family Units", initials: "TW", color: "bg-indigo-600" },
  { id: 7, name: "Diana Chen", title: "Condo & Apartment Expert", sales: 89, rating: 4.7, city: "San Francisco, CA", specialty: "Urban Living", initials: "DC", color: "bg-teal-600" },
  { id: 8, name: "Robert Silva", title: "Land & Development", sales: 54, rating: 4.8, city: "Marin County, CA", specialty: "Land & New Builds", initials: "RS", color: "bg-amber-600" },
  { id: 9, name: "Angela Moore", title: "Residential Specialist", sales: 121, rating: 4.9, city: "Fremont, CA", specialty: "Family Homes", initials: "AM", color: "bg-pink-600" },
];

const stats = [
  { label: "Total Agents", value: "340+" },
  { label: "Cities Covered", value: "120+" },
  { label: "Avg. Rating", value: "4.9 ★" },
  { label: "Properties Sold", value: "8,200+" },
];

export default function AgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold text-xs uppercase tracking-widest">Expert Team</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">Meet Our Agents</h1>
            <p className="text-white/65 leading-relaxed">
              Certified professionals with deep local knowledge. Whether you&apos;re buying, selling, or renting — our agents have you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-accent">{s.value}</p>
                <p className="text-xs text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow group">
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-16 h-16 ${agent.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow`}>
                  <span className="text-white text-xl font-bold">{agent.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{agent.name}</h3>
                  <p className="text-sm text-accent font-semibold mt-0.5">{agent.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <p className="text-xs text-muted">{agent.city}</p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-xl px-4 py-3 mb-4 text-xs text-muted">
                <span className="font-semibold text-primary">{agent.specialty}</span>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1 text-center bg-background rounded-xl py-2.5">
                  <p className="text-xl font-bold text-primary">{agent.sales}</p>
                  <p className="text-xs text-muted">Sales</p>
                </div>
                <div className="flex-1 text-center bg-background rounded-xl py-2.5">
                  <p className="text-xl font-bold text-primary">{agent.rating}</p>
                  <p className="text-xs text-muted">Rating</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/contact" className="flex-1 bg-primary text-white text-sm font-bold py-2.5 rounded-xl text-center hover:bg-primary-light transition-colors">
                  Contact
                </Link>
                <Link href={`/properties`} className="flex-1 border border-border text-sm font-semibold py-2.5 rounded-xl text-center text-foreground hover:bg-background transition-colors">
                  Listings
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-border py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Are You a Real Estate Agent?</h2>
          <p className="text-muted mb-6">Join our network of 340+ certified professionals and get access to qualified leads, premium tools, and marketing support.</p>
          <Link href="/contact" className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-light transition-colors inline-block">
            Apply to Join
          </Link>
        </div>
      </section>
    </>
  );
}
