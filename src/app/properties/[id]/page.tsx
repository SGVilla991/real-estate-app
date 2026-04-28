import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getFavoriteIds } from "@/app/actions/favorites";
import ImageGallery from "@/components/ImageGallery";
import PropertyCard, { type Property } from "@/components/PropertyCard";
import FavoriteButton from "@/components/FavoriteButton";

const SEED = [
  { id: "1", title: "Modern Downtown Penthouse", price: 1250000, type: "sale", property_type: "penthouse", beds: 3, baths: 2, sqft: 2100, parking: 1, address: "850 Market St", city: "San Francisco, CA", neighborhood: "Downtown", image_url: null, tag: "Featured", description: "A stunning penthouse with panoramic city views, chef's kitchen, and private rooftop terrace. Recently renovated with premium finishes throughout.", amenities: ["Pool", "Gym", "Security", "Elevator", "Balcony", "Air Conditioning"], year_built: 2018 },
  { id: "2", title: "Spacious Mission District Home", price: 875000, type: "sale", property_type: "house", beds: 4, baths: 3, sqft: 2800, parking: 2, address: "2340 Valencia St", city: "San Francisco, CA", neighborhood: "Mission District", image_url: null, tag: null, description: "Victorian charm meets modern living. This beautifully restored home features original hardwood floors, updated kitchen, and a private backyard.", amenities: ["Garden", "Parking", "Pet Friendly"], year_built: 1910 },
  { id: "3", title: "Pacific Heights Luxury Apartment", price: 5500, type: "rent", property_type: "apartment", beds: 2, baths: 2, sqft: 1400, parking: 1, address: "1820 Broadway", city: "San Francisco, CA", neighborhood: "Pacific Heights", image_url: null, tag: "New", description: "Bright and airy apartment in coveted Pacific Heights. Floor-to-ceiling windows, in-unit laundry, and stunning bay views from the living room.", amenities: ["Gym", "Elevator", "Balcony", "Air Conditioning", "Furnished"], year_built: 2015 },
];

const amenityIcons: Record<string, string> = {
  Pool: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  Gym: "M18 20V10M12 20V4M6 20v-6",
  Parking: "M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2h-2m-6 0a2 2 0 11-4 0 2 2 0 014 0z",
  Security: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  Elevator: "M5 3v18M19 3v18M5 12h14M12 3v3m0 12v3",
  Balcony: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  Garden: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  "Pet Friendly": "M4.5 11.5A.5.5 0 015 11h14a.5.5 0 010 1H5a.5.5 0 01-.5-.5zM12 3a9 9 0 100 18A9 9 0 0012 3z",
  "Air Conditioning": "M8 2v4m8-4v4M3 10h18M5 21V10h14v11M9 21v-5a3 3 0 016 0v5",
  Furnished: "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
  Laundry: "M3 3h18v18H3zM8 10a4 4 0 108 0 4 4 0 00-8 0z",
  BBQ: "M17 8l4 4m0 0l-4 4m4-4H3m9-7v2m0 14v2",
};

async function getProperty(id: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("properties").select("*").eq("id", id).single();
    if (data) return data;
  } catch { /* fall through */ }
  return SEED.find((p) => p.id === id) ?? null;
}

async function getSimilar(current: { id: string; type: string; city: string; property_type?: string }): Promise<Property[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("properties").select("*")
      .eq("type", current.type).neq("id", current.id)
      .limit(3);

    if (!data || data.length === 0) return [];
    return data.map((r) => ({
      id: String(r.id), title: r.title, price: r.price,
      type: r.type as "sale" | "rent", property_type: r.property_type,
      beds: r.beds, baths: r.baths, sqft: r.sqft, parking: r.parking,
      address: r.address, city: r.city, neighborhood: r.neighborhood,
      image: r.image_url ?? "", tag: r.tag ?? undefined,
    }));
  } catch { return []; }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [property, supabase] = await Promise.all([
    getProperty(id),
    createClient(),
  ]);

  if (!property) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  const [favoriteIds, similar] = await Promise.all([
    getFavoriteIds(),
    getSimilar({ id: property.id, type: property.type, city: property.city, property_type: property.property_type }),
  ]);

  const isFavorited = favoriteIds.includes(String(property.id));

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(property.price);

  const images = property.image_url ? [property.image_url] : [];
  const amenities: string[] = property.amenities ?? [];

  const propertyTypeLabel: Record<string, string> = {
    house: "House", apartment: "Apartment", office: "Office",
    commercial: "Commercial", land: "Land", penthouse: "Penthouse",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-48">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column ─────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <ImageGallery images={images} title={property.title} />

          {/* Title & Badges */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${property.type === "sale" ? "bg-primary text-white" : "bg-green text-white"}`}>
                  For {property.type === "sale" ? "Sale" : "Rent"}
                </span>
                {property.property_type && propertyTypeLabel[property.property_type] && (
                  <span className="text-xs font-semibold bg-surface-2 border border-border px-2.5 py-1 rounded-full text-muted">
                    {propertyTypeLabel[property.property_type]}
                  </span>
                )}
                {property.tag && (
                  <span className="text-xs font-bold bg-accent text-white px-2.5 py-1 rounded-full">{property.tag}</span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{property.title}</h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-muted text-sm">{property.address}, {property.city}</p>
              </div>
            </div>
            <FavoriteButton propertyId={String(property.id)} initialFavorited={isFavorited} isLoggedIn={!!user} />
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Bedrooms", value: property.beds, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
              { label: "Bathrooms", value: property.baths, icon: "M4 6h16M4 10h16M4 14h16M4 18h7" },
              { label: "Square Feet", value: property.sqft ? property.sqft.toLocaleString() : "—", icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" },
              { label: "Parking", value: property.parking ?? 0, icon: "M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2h-2m-6 0a2 2 0 11-4 0 2 2 0 014 0z" },
            ].map((s) => (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                <svg className="w-5 h-5 text-primary mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                </svg>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          {property.description && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-bold text-foreground text-lg mb-3">About This Property</h2>
              <p className="text-muted leading-relaxed text-sm">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-bold text-foreground text-lg mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm">
                    <div className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={amenityIcons[a] ?? "M5 13l4 4L19 7"} />
                      </svg>
                    </div>
                    <span className="font-medium text-foreground">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Details Table */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-bold text-foreground text-lg mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              {[
                { label: "Listing Type", value: property.type === "sale" ? "For Sale" : "For Rent" },
                { label: "Property Type", value: property.property_type ? propertyTypeLabel[property.property_type] ?? property.property_type : "—" },
                { label: "City", value: property.city },
                { label: "Neighborhood", value: property.neighborhood ?? "—" },
                { label: "Year Built", value: property.year_built ?? "—" },
                { label: "Parking Spaces", value: property.parking ?? 0 },
                { label: "Square Feet", value: property.sqft ? `${property.sqft.toLocaleString()} ft²` : "—" },
                { label: "Price/sqft", value: property.sqft > 0 ? `$${Math.round(property.price / property.sqft).toLocaleString()}` : "—" },
              ].map((d) => (
                <div key={d.label} className="flex flex-col">
                  <span className="text-muted text-xs">{d.label}</span>
                  <span className="font-semibold text-foreground">{String(d.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-bold text-foreground text-lg mb-3">Location</h2>
            <div className="bg-background rounded-xl h-40 flex items-center justify-center border border-border">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.address} ${property.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold">View on Google Maps</span>
                <span className="text-xs text-muted">{property.address}, {property.city}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ─────────────────────────────── */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm sticky top-20 space-y-4">
            {/* Price */}
            <div>
              <p className="text-3xl font-bold text-primary">
                {formatted}
                {property.type === "rent" && <span className="text-base font-normal text-muted">/mo</span>}
              </p>
              {property.sqft > 0 && property.type === "sale" && (
                <p className="text-sm text-muted mt-0.5">
                  ${Math.round(property.price / property.sqft).toLocaleString()} / ft²
                </p>
              )}
            </div>

            <hr className="border-border" />

            {/* Contact Form */}
            <div>
              <p className="font-semibold text-foreground mb-3 text-sm">Request More Info</p>
              <div className="space-y-2.5">
                <input type="text" placeholder="Your name" className="w-full px-3 py-2.5 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors bg-background" />
                <input type="email" placeholder="Your email" className="w-full px-3 py-2.5 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors bg-background" />
                <input type="tel" placeholder="Phone (optional)" className="w-full px-3 py-2.5 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors bg-background" />
                <textarea rows={3} placeholder="I'm interested in this property..." className="w-full px-3 py-2.5 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors bg-background resize-none" />
                <Link href="/contact" className="block w-full bg-primary text-white font-bold py-3 rounded-xl text-center hover:bg-primary-light transition-colors text-sm">
                  Contact Agent
                </Link>
                <Link href="/contact" className="block w-full border border-border text-foreground font-semibold py-3 rounded-xl text-center hover:bg-background transition-colors text-sm">
                  Schedule a Viewing
                </Link>
              </div>
            </div>

            <hr className="border-border" />

            {/* Mortgage estimate */}
            <div className="bg-primary/5 rounded-xl p-3">
              <p className="text-xs font-semibold text-primary mb-1">Est. Monthly Payment</p>
              <p className="text-xl font-bold text-primary">
                {property.type === "sale"
                  ? `$${Math.round((property.price * 0.8 * 0.00527)).toLocaleString()}`
                  : formatted}
                <span className="text-xs font-normal text-muted">/mo</span>
              </p>
              <p className="text-xs text-muted mt-0.5">20% down, 6.5% rate, 30yr</p>
              <Link href="/calculator" className="text-xs text-accent font-semibold hover:underline">
                Adjust in calculator →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} isFavorited={favoriteIds.includes(p.id)} isLoggedIn={!!user} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
