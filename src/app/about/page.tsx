export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About EstatePrime</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2010, we've helped over 8,000 families find their perfect home. Our mission is to make real estate transparent, accessible, and stress-free.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">Built on Trust, Driven by Results</h2>
            <p className="text-muted leading-relaxed mb-4">
              EstatePrime was founded with a simple belief: buying or selling a home should be an exciting milestone, not a stressful ordeal. We built a platform that puts verified data, expert agents, and transparent pricing at the center of every transaction.
            </p>
            <p className="text-muted leading-relaxed">
              Today we operate in 120+ cities nationwide with a team of 340+ certified agents and a portfolio of 12,000+ active listings.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Founded", value: "2010" },
              { label: "Cities", value: "120+" },
              { label: "Agents", value: "340+" },
              { label: "Transactions", value: "$4.2B+" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-border rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "No hidden fees, no surprises. We believe every client deserves full clarity at every stage." },
              { title: "Excellence", desc: "We hold ourselves to the highest standard — in listings, in service, and in results." },
              { title: "Community", desc: "We reinvest in the neighborhoods we serve, sponsoring local programs and housing initiatives." },
            ].map((v) => (
              <div key={v.title} className="border border-border rounded-2xl p-6">
                <h3 className="font-bold text-primary text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
