import Link from "next/link";

export type Property = {
  id: string;
  title: string;
  price: number;
  type: "sale" | "rent";
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  city: string;
  image: string;
  tag?: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link href={`/properties/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border">
      <div className="relative h-52 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
        {property.tag && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            {property.tag}
          </span>
        )}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${property.type === "sale" ? "bg-primary text-white" : "bg-green-600 text-white"}`}>
          For {property.type === "sale" ? "Sale" : "Rent"}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xl font-bold text-primary">
          {formatted}
          {property.type === "rent" && <span className="text-sm font-normal text-muted">/mo</span>}
        </p>
        <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>
        <p className="text-sm text-muted mt-1">{property.address}, {property.city}</p>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm text-muted">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {property.baths} Baths
          </span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </Link>
  );
}
