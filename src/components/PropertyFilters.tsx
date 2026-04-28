"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const propTypes = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "office", label: "Office" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "penthouse", label: "Penthouse" },
];

const amenityOptions = [
  "Pool", "Gym", "Parking", "Security", "Elevator",
  "Balcony", "Garden", "Pet Friendly", "Air Conditioning", "Furnished",
];

export default function PropertyFilters({
  currentParams,
}: {
  currentParams: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const [city, setCity] = useState(currentParams.city ?? "");
  const [minPrice, setMinPrice] = useState(currentParams.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(currentParams.maxPrice ?? "");
  const [beds, setBeds] = useState(currentParams.beds ?? "");
  const [baths, setBaths] = useState(currentParams.baths ?? "");
  const [propType, setPropType] = useState(currentParams.propertyType ?? "");

  function applyFilters() {
    const p = new URLSearchParams();
    if (currentParams.type) p.set("type", currentParams.type);
    if (city) p.set("city", city);
    if (minPrice) p.set("minPrice", minPrice);
    if (maxPrice) p.set("maxPrice", maxPrice);
    if (beds) p.set("beds", beds);
    if (baths) p.set("baths", baths);
    if (propType) p.set("propertyType", propType);
    if (currentParams.sort) p.set("sort", currentParams.sort);
    router.push(`/properties?${p.toString()}`);
  }

  function clearFilters() {
    setCity(""); setMinPrice(""); setMaxPrice("");
    setBeds(""); setBaths(""); setPropType("");
    router.push("/properties");
  }

  const inputClass = "w-full px-3 py-2.5 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors bg-surface text-foreground";

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Filters</h3>
        <button onClick={clearFilters} className="text-xs text-muted hover:text-accent transition-colors">
          Clear all
        </button>
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">Location</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City or neighborhood"
          className={inputClass}
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">Property Type</label>
        <div className="flex flex-wrap gap-2">
          {propTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setPropType(propType === t.value ? "" : t.value)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                propType === t.value
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">Price Range</label>
        <div className="flex gap-2">
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" className={inputClass} />
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" className={inputClass} />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">Min. Bedrooms</label>
        <div className="flex gap-2">
          {["", "1", "2", "3", "4"].map((v) => (
            <button
              key={v}
              onClick={() => setBeds(v)}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors font-medium ${
                beds === v
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {v === "" ? "Any" : `${v}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">Min. Bathrooms</label>
        <div className="flex gap-2">
          {["", "1", "2", "3"].map((v) => (
            <button
              key={v}
              onClick={() => setBaths(v)}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors font-medium ${
                baths === v
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {v === "" ? "Any" : `${v}+`}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-light transition-colors text-sm"
      >
        Apply Filters
      </button>
    </div>
  );
}
