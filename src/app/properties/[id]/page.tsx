import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const SEED = [
  { id: "1", title: "Modern Downtown Penthouse", price: 1250000, type: "sale", beds: 3, baths: 2, sqft: 2100, address: "850 Market St", city: "San Francisco, CA", image_url: null, tag: "Featured", description: null },
  { id: "2", title: "Spacious Mission District Home", price: 875000, type: "sale", beds: 4, baths: 3, sqft: 2800, address: "2340 Valencia St", city: "San Francisco, CA", image_url: null, tag: null, description: null },
  { id: "3", title: "Pacific Heights Luxury Apartment", price: 5500, type: "rent", beds: 2, baths: 2, sqft: 1400, address: "1820 Broadway", city: "San Francisco, CA", image_url: null, tag: "New", description: null },
  { id: "4", title: "Noe Valley Victorian", price: 1650000, type: "sale", beds: 5, baths: 4, sqft: 3400, address: "4120 26th St", city: "San Francisco, CA", image_url: null, tag: null, description: null },
  { id: "5", title: "SoMa Studio Loft", price: 3200, type: "rent", beds: 1, baths: 1, sqft: 750, address: "901 Brannan St", city: "San Francisco, CA", image_url: null, tag: null, description: null },
  { id: "6", title: "Richmond District Bungalow", price: 995000, type: "sale", beds: 3, baths: 2, sqft: 1900, address: "512 Clement St", city: "San Francisco, CA", image_url: null, tag: null, description: null },
];

async function getProperty(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) return data;
  } catch {
    // fall through to seed
  }

  return SEED.find((p) => p.id === id) ?? null;
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) notFound();

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link href="/properties" className="text-sm font-medium text-muted hover:text-primary transition-colors mb-6 inline-flex items-center gap-1">
        ← Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {/* Left — image + details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Image */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-gray-200">
            {property.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
            )}
            {property.tag && (
              <span className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                {property.tag}
              </span>
            )}
            <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${property.type === "sale" ? "bg-primary text-white" : "bg-green-600 text-white"}`}>
              For {property.type === "sale" ? "Sale" : "Rent"}
            </span>
          </div>

          {/* Title + address */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
            <p className="text-muted mt-1">{property.address}, {property.city}</p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 bg-white border border-border rounded-2xl p-5">
            {[
              { label: "Bedrooms", value: property.beds },
              { label: "Bathrooms", value: property.baths },
              { label: "Square Feet", value: property.sqft.toLocaleString() },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          {property.description && (
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground mb-2">About this property</h2>
              <p className="text-sm text-muted leading-relaxed">{property.description}</p>
            </div>
          )}
        </div>

        {/* Right — price + contact card */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm sticky top-20">
            <p className="text-3xl font-bold text-primary">
              {formatted}
              {property.type === "rent" && <span className="text-base font-normal text-muted">/mo</span>}
            </p>
            <p className="text-sm text-muted mt-1">{property.address}, {property.city}</p>

            <hr className="my-4 border-border" />

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="bg-primary text-white font-semibold py-3 rounded-xl text-center hover:bg-primary-light transition-colors text-sm"
              >
                Contact Agent
              </Link>
              <Link
                href="/contact"
                className="border border-border text-foreground font-semibold py-3 rounded-xl text-center hover:bg-gray-50 transition-colors text-sm"
              >
                Schedule a Viewing
              </Link>
            </div>

            <p className="text-xs text-muted text-center mt-4">
              Listed on EstatePrime. Verified listing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
