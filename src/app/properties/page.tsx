import PropertyCard, { type Property } from "@/components/PropertyCard";

const allProperties: Property[] = [
  { id: "1", title: "Modern Downtown Penthouse", price: 1250000, type: "sale", beds: 3, baths: 2, sqft: 2100, address: "850 Market St", city: "San Francisco, CA", image: "", tag: "Featured" },
  { id: "2", title: "Spacious Mission District Home", price: 875000, type: "sale", beds: 4, baths: 3, sqft: 2800, address: "2340 Valencia St", city: "San Francisco, CA", image: "" },
  { id: "3", title: "Pacific Heights Luxury Apartment", price: 5500, type: "rent", beds: 2, baths: 2, sqft: 1400, address: "1820 Broadway", city: "San Francisco, CA", image: "", tag: "New" },
  { id: "4", title: "Noe Valley Victorian", price: 1650000, type: "sale", beds: 5, baths: 4, sqft: 3400, address: "4120 26th St", city: "San Francisco, CA", image: "" },
  { id: "5", title: "SoMa Studio Loft", price: 3200, type: "rent", beds: 1, baths: 1, sqft: 750, address: "901 Brannan St", city: "San Francisco, CA", image: "" },
  { id: "6", title: "Richmond District Bungalow", price: 995000, type: "sale", beds: 3, baths: 2, sqft: 1900, address: "512 Clement St", city: "San Francisco, CA", image: "" },
];

export default function PropertiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Properties</h1>
        <p className="text-muted">Browse our full portfolio of verified listings.</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-2xl p-4 mb-8 flex flex-wrap gap-3">
        <select className="px-4 py-2 text-sm rounded-lg border border-border outline-none text-foreground bg-background">
          <option>All Types</option>
          <option>For Sale</option>
          <option>For Rent</option>
        </select>
        <select className="px-4 py-2 text-sm rounded-lg border border-border outline-none text-foreground bg-background">
          <option>Any Beds</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
          <option>4+</option>
        </select>
        <select className="px-4 py-2 text-sm rounded-lg border border-border outline-none text-foreground bg-background">
          <option>Any Price</option>
          <option>Under $500K</option>
          <option>$500K – $1M</option>
          <option>$1M – $2M</option>
          <option>$2M+</option>
        </select>
        <input
          type="text"
          placeholder="Search location..."
          className="flex-1 min-w-40 px-4 py-2 text-sm rounded-lg border border-border outline-none text-foreground bg-background placeholder:text-muted"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProperties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
