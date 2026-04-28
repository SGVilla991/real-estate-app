import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export type Property = {
  id: string;
  title: string;
  price: number;
  type: "sale" | "rent";
  property_type?: string;
  beds: number;
  baths: number;
  sqft: number;
  parking?: number;
  address: string;
  city: string;
  neighborhood?: string;
  image: string;
  tag?: string;
};

const propertyTypeLabel: Record<string, string> = {
  house: "House",
  apartment: "Apartment",
  office: "Office",
  commercial: "Commercial",
  land: "Land",
  penthouse: "Penthouse",
};

export default function PropertyCard({
  property,
  isFavorited = false,
  isLoggedIn = false,
}: {
  property: Property;
  isFavorited?: boolean;
  isLoggedIn?: boolean;
}) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  const pricePerSqft =
    property.sqft > 0
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
          Math.round(property.price / property.sqft)
        )
      : null;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {property.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center">
            <svg className="w-14 h-14 text-white/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.tag && (
            <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              {property.tag}
            </span>
          )}
          {property.property_type && propertyTypeLabel[property.property_type] && (
            <span className="bg-white/90 text-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow">
              {propertyTypeLabel[property.property_type]}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full shadow ${
              property.type === "sale" ? "bg-primary text-white" : "bg-green text-white"
            }`}
          >
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </span>
          <FavoriteButton
            propertyId={property.id}
            initialFavorited={isFavorited}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xl font-bold text-primary leading-tight">
              {formatted}
              {property.type === "rent" && (
                <span className="text-xs font-normal text-muted">/mo</span>
              )}
            </p>
            {pricePerSqft && property.type === "sale" && (
              <p className="text-xs text-muted-light mt-0.5">{pricePerSqft}/sqft</p>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-1 text-sm">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <svg className="w-3.5 h-3.5 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-xs text-muted truncate">
            {property.neighborhood ? `${property.neighborhood}, ` : ""}{property.city}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border text-xs text-muted">
          {property.beds > 0 && (
            <span className="flex items-center gap-1 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.beds} bd
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
              </svg>
              {property.baths} ba
            </span>
          )}
          {property.sqft > 0 && (
            <span className="font-medium">{property.sqft.toLocaleString()} ft²</span>
          )}
          {property.parking != null && property.parking > 0 && (
            <span className="flex items-center gap-1 font-medium ml-auto">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17H3a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2h-2m-6 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {property.parking}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
