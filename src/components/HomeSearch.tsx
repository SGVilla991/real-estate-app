"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [beds, setBeds] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", tab);
    if (location) params.set("city", location);
    if (propertyType) params.set("propertyType", propertyType);
    if (beds) params.set("beds", beds);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["sale", "rent"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-primary text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t === "sale" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="p-3 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, neighborhood, or ZIP..."
          className="flex-1 px-4 py-3 text-sm rounded-xl border border-border outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted"
        />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="px-3 py-3 text-sm rounded-xl border border-border outline-none text-foreground bg-surface-2"
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="office">Office</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
          <option value="penthouse">Penthouse</option>
        </select>
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className="px-3 py-3 text-sm rounded-xl border border-border outline-none text-foreground bg-surface-2"
        >
          <option value="">Any Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <button
          type="submit"
          className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
}
