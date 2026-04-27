const agents = [
  { id: 1, name: "Sarah Mitchell", title: "Senior Listing Agent", sales: 142, rating: 4.9, city: "San Francisco, CA" },
  { id: 2, name: "Carlos Rivera", title: "Buyer's Specialist", sales: 98, rating: 4.8, city: "Oakland, CA" },
  { id: 3, name: "Jennifer Lau", title: "Luxury Properties Expert", sales: 210, rating: 5.0, city: "Palo Alto, CA" },
  { id: 4, name: "Marcus Johnson", title: "Commercial Real Estate", sales: 77, rating: 4.7, city: "San Jose, CA" },
  { id: 5, name: "Priya Patel", title: "Relocation Specialist", sales: 133, rating: 4.9, city: "San Francisco, CA" },
  { id: 6, name: "Tom Whitfield", title: "Investment Properties", sales: 165, rating: 4.8, city: "Berkeley, CA" },
];

export default function AgentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Our Team</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Meet Our Expert Agents</h1>
        <p className="text-muted max-w-xl mx-auto">Certified professionals who know the local market inside and out.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">
                {agent.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <h3 className="font-bold text-foreground text-lg">{agent.name}</h3>
            <p className="text-sm text-accent font-medium mt-1">{agent.title}</p>
            <p className="text-sm text-muted mt-1">{agent.city}</p>

            <div className="flex gap-6 mt-4 pt-4 border-t border-border w-full justify-center">
              <div>
                <p className="text-xl font-bold text-primary">{agent.sales}</p>
                <p className="text-xs text-muted">Sales</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">{agent.rating}</p>
                <p className="text-xs text-muted">Rating</p>
              </div>
            </div>

            <button className="mt-4 w-full bg-primary text-white text-sm font-semibold py-2 rounded-xl hover:bg-primary-light transition-colors">
              Contact Agent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
