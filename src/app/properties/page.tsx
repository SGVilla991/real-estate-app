import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PropertyCard, { type Property } from "@/components/PropertyCard";
import { getFavoriteIds } from "@/app/actions/favorites";
import PropertyFilters from "@/components/PropertyFilters";

const SEED: Property[] = [
  { id: "1", title: "Modern Downtown Penthouse", price: 1250000, type: "sale", property_type: "penthouse", beds: 3, baths: 2, sqft: 2100, parking: 1, address: "850 Market St", city: "San Francisco, CA", neighborhood: "Downtown", image: "", tag: "Featured" },
  { id: "2", title: "Spacious Mission District Home", price: 875000, type: "sale", property_type: "house", beds: 4, baths: 3, sqft: 2800, parking: 2, address: "2340 Valencia St", city: "San Francisco, CA", neighborhood: "Mission District", image: "" },
  { id: "3", title: "Pacific Heights Luxury Apartment", price: 5500, type: "rent", property_type: "apartment", beds: 2, baths: 2, sqft: 1400, parking: 1, address: "1820 Broadway", city: "San Francisco, CA", neighborhood: "Pacific Heights", image: "", tag: "New" },
  { id: "4", title: "Noe Valley Victorian", price: 1650000, type: "sale", property_type: "house", beds: 5, baths: 4, sqft: 3400, parking: 2, address: "4120 26th St", city: "San Francisco, CA", image: "" },
  { id: "5", title: "SoMa Studio Loft", price: 3200, type: "rent", property_type: "apartment", beds: 1, baths: 1, sqft: 750, address: "901 Brannan St", city: "San Francisco, CA", image: "" },
  { id: "6", title: "Richmond District Bungalow", price: 995000, type: "sale", property_type: "house", beds: 3, baths: 2, sqft: 1900, address: "512 Clement St", city: "San Francisco, CA", image: "" },
];

async function getProperties(filters: Record<string, string | undefined>) {
  try {
    const supabase = await createClient();
    let query = supabase.from("properties").select("*");

    if (filters.type && filters.type !== "all") query = query.eq("type", filters.type);
    if (filters.propertyType) query = query.eq("property_type", filters.propertyType);
    if (filters.beds) query = query.gte("beds", Number(filters.beds));
    if (filters.baths) query = query.gte("baths", Number(filters.baths));
    if (filters.minPrice) query = query.gte("price", Number(filters.minPrice));
    if (filters.maxPrice) query = query.lte("price", Number(filters.maxPrice));
    if (filters.city) query = query.ilike("city", `%${filters.city}%`);

    const sortMap: Record<string, { col: string; asc: boolean }> = {
      newest: { col: "created_at", asc: false },
      price_asc: { col: "price", asc: true },
      price_desc: { col: "price", asc: false },
    };
    const sort = sortMap[filters.sort ?? "newest"] ?? sortMap.newest;
    query = query.order(sort.col, { ascending: sort.asc });

    const { data } = await query;
    if (!data || data.length === 0) return SEED;

    return data.map((r) => ({
      id: String(r.id), title: r.title, price: r.price,
      type: r.type as "sale" | "rent", property_type: r.property_type,
      beds: r.beds, baths: r.baths, sqft: r.sqft, parking: r.parking,
      address: r.address, city: r.city, neighborhood: r.neighborhood,
      image: r.image_url ?? "", tag: r.tag ?? undefined,
    }));
  } catch { return SEED; }
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const [properties, favoriteIds, supabase] = await Promise.all([
    getProperties(params),
    getFavoriteIds(),
    createClient(),
  ]);
  const { data: { user } } = await supabase.auth.getUser();

  const activeType = params.type ?? "all";
  const activeSort = params.sort ?? "newest";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {activeType === "sale" ? "Properties for Sale" : activeType === "rent" ? "Properties for Rent" : "All Properties"}
          </h1>
          <p className="text-sm text-muted mt-0.5">{properties.length} results</p>
        </div>
        {user && (
          <Link href="/listings/new" className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-accent-dark transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Listing
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <PropertyFilters currentParams={params} />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="flex bg-surface border border-border rounded-xl overflow-hidden text-sm">
              {[
                { v: "all", l: "All" },
                { v: "sale", l: "For Sale" },
                { v: "rent", l: "For Rent" },
              ].map((t) => (
                <Link
                  key={t.v}
                  href={`/properties?${new URLSearchParams({ ...params, type: t.v }).toString()}`}
                  className={`px-4 py-2 font-medium transition-colors ${activeType === t.v ? "bg-primary text-white" : "text-muted hover:text-foreground"}`}
                >
                  {t.l}
                </Link>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted">Sort:</span>
              <div className="flex bg-surface border border-border rounded-xl overflow-hidden">
                {[
                  { v: "newest", l: "Newest" },
                  { v: "price_asc", l: "Price ↑" },
                  { v: "price_desc", l: "Price ↓" },
                ].map((s) => (
                  <Link
                    key={s.v}
                    href={`/properties?${new URLSearchParams({ ...params, sort: s.v }).toString()}`}
                    className={`px-3 py-2 font-medium transition-colors ${activeSort === s.v ? "bg-primary text-white" : "text-muted hover:text-foreground"}`}
                  >
                    {s.l}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-2xl border border-border">
              <svg className="w-12 h-12 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-muted text-lg mb-2">No properties found</p>
              <p className="text-muted text-sm mb-4">Try adjusting your filters</p>
              <Link href="/properties" className="text-primary font-semibold hover:text-accent transition-colors text-sm">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} isFavorited={favoriteIds.includes(p.id)} isLoggedIn={!!user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
