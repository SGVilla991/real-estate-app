import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PropertyCard, { type Property } from "@/components/PropertyCard";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: favs } = await supabase
    .from("favorites")
    .select("property_id, properties(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const properties: Property[] = (favs ?? [])
    .filter((f) => f.properties)
    .map((f) => {
      const r = f.properties as unknown as Record<string, unknown>;
      return {
        id: String(r.id), title: r.title as string, price: r.price as number,
        type: r.type as "sale" | "rent", property_type: r.property_type as string,
        beds: r.beds as number, baths: r.baths as number, sqft: r.sqft as number,
        parking: r.parking as number, address: r.address as string,
        city: r.city as string, neighborhood: r.neighborhood as string,
        image: (r.image_url as string) ?? "", tag: (r.tag as string) ?? undefined,
      };
    });

  const favoriteIds = properties.map((p) => p.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-muted hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saved Properties</h1>
          <p className="text-sm text-muted">{properties.length} {properties.length === 1 ? "property" : "properties"} saved</p>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-surface border border-border rounded-2xl">
          <svg className="w-12 h-12 text-muted mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-muted mb-4">You haven&apos;t saved any properties yet.</p>
          <Link href="/properties" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors text-sm">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} isFavorited={favoriteIds.includes(p.id)} isLoggedIn={true} />
          ))}
        </div>
      )}
    </div>
  );
}
