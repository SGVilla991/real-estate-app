import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PropertyCard, { type Property } from "@/components/PropertyCard";
import { deleteProperty } from "@/app/actions/properties";

async function getUserData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: listings }, { data: favCount }] = await Promise.all([
    supabase.from("properties").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("favorites").select("id", { count: "exact" }).eq("user_id", user.id),
  ]);

  return {
    user,
    listings: (listings ?? []).map((r) => ({
      id: String(r.id), title: r.title, price: r.price,
      type: r.type as "sale" | "rent", property_type: r.property_type,
      beds: r.beds, baths: r.baths, sqft: r.sqft, parking: r.parking,
      address: r.address, city: r.city, neighborhood: r.neighborhood,
      image: r.image_url ?? "", tag: r.tag ?? undefined,
    })) as Property[],
    favCount: favCount?.length ?? 0,
  };
}

export default async function DashboardPage() {
  const data = await getUserData();
  if (!data) redirect("/login");

  const { user, listings, favCount } = data;
  const name = user.user_metadata?.full_name ?? user.email ?? "User";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted mt-1">Welcome back, {name.split(" ")[0]}</p>
        </div>
        <Link href="/listings/new" className="bg-accent text-white font-bold px-5 py-2.5 rounded-xl hover:bg-accent-dark transition-colors text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "My Listings", value: listings.length, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "#listings" },
          { label: "Saved Properties", value: favCount, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", href: "/dashboard/favorites" },
          { label: "For Sale", value: listings.filter((l) => l.type === "sale").length, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", href: "#listings" },
          { label: "For Rent", value: listings.filter((l) => l.type === "rent").length, icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z", href: "#listings" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="bg-surface border border-border rounded-2xl p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/8 group-hover:bg-primary/15 rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="flex gap-3 mb-8">
        <Link href="/dashboard/favorites" className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
          <svg className="w-4 h-4 fill-red-500" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Saved Properties
        </Link>
        <Link href="/calculator" className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M16 5h2a2 2 0 012 2v2M8 12h4m0 0v4m0-4h4" />
          </svg>
          Mortgage Calculator
        </Link>
      </div>

      {/* Listings */}
      <div id="listings">
        <h2 className="text-xl font-bold text-foreground mb-5">My Listings</h2>
        {listings.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-2xl">
            <svg className="w-12 h-12 text-muted mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p className="text-muted mb-4">You haven&apos;t listed any properties yet.</p>
            <Link href="/listings/new" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors text-sm">
              List Your First Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((p) => (
              <div key={p.id} className="relative">
                <PropertyCard property={p} isLoggedIn={true} />
                <form action={deleteProperty.bind(null, p.id)}>
                  <button
                    type="submit"
                    className="absolute bottom-20 right-4 text-xs text-red font-semibold bg-white/90 border border-red/20 rounded-lg px-2.5 py-1 hover:bg-red-50 transition-colors"
                    onClick={(e) => { if (!confirm("Delete this listing?")) e.preventDefault(); }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
