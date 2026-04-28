"use client";

import { useActionState } from "react";
import { createProperty } from "@/app/actions/properties";

const AMENITIES = [
  "Pool", "Gym", "Parking", "Security", "Elevator",
  "Balcony", "Garden", "Pet Friendly", "Air Conditioning",
  "Furnished", "Laundry", "BBQ Area",
];

const ic = "w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background text-foreground";
const lc = "text-sm font-semibold text-foreground mb-1.5 block";

export default function NewListingForm() {
  const [state, action, pending] = useActionState(createProperty, undefined);

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-2">Basic Information</h3>
        <div>
          <label className={lc}>Title *</label>
          <input name="title" required placeholder="e.g. Modern 3-Bed Apartment in Downtown" className={ic} />
        </div>
        <div>
          <label className={lc}>Description</label>
          <textarea name="description" rows={4} placeholder="Describe the property — highlights, features, nearby amenities..." className={`${ic} resize-none`} />
        </div>
      </div>

      {/* Type & Pricing */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-2">Type & Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={lc}>Listing Type *</label>
            <select name="type" required className={ic}>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          <div>
            <label className={lc}>Property Type *</label>
            <select name="property_type" required className={ic}>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="office">Office</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div>
            <label className={lc}>Price (USD) *</label>
            <input name="price" type="number" required min={1} placeholder="e.g. 850000" className={ic} />
          </div>
        </div>
        <div>
          <label className={lc}>Tag (optional)</label>
          <input name="tag" placeholder="e.g. Featured, New, Hot Deal, Reduced" className={ic} />
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-2">Property Details</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={lc}>Bedrooms *</label>
            <input name="beds" type="number" required min={0} placeholder="3" className={ic} />
          </div>
          <div>
            <label className={lc}>Bathrooms *</label>
            <input name="baths" type="number" required min={0} placeholder="2" className={ic} />
          </div>
          <div>
            <label className={lc}>Sqft *</label>
            <input name="sqft" type="number" required min={1} placeholder="1500" className={ic} />
          </div>
          <div>
            <label className={lc}>Parking Spaces</label>
            <input name="parking" type="number" min={0} placeholder="1" className={ic} />
          </div>
        </div>
        <div>
          <label className={lc}>Year Built</label>
          <input name="year_built" type="number" min={1800} max={new Date().getFullYear()} placeholder="e.g. 2010" className={ic} />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-2">Location</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className={lc}>Street Address *</label>
            <input name="address" required placeholder="123 Main St" className={ic} />
          </div>
          <div>
            <label className={lc}>City, State *</label>
            <input name="city" required placeholder="San Francisco, CA" className={ic} />
          </div>
        </div>
        <div>
          <label className={lc}>Neighborhood</label>
          <input name="neighborhood" placeholder="e.g. Mission District, Downtown" className={ic} />
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-2">Amenities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                name="amenities"
                value={a}
                className="w-4 h-4 rounded border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{a}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photo */}
      <div className="space-y-3">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-2">Photo</h3>
        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors">
          <svg className="w-10 h-10 text-muted mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-muted mb-2">Upload a property photo</p>
          <input name="image" type="file" accept="image/*" className="text-sm text-muted file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:text-sm file:font-semibold hover:file:bg-primary-light cursor-pointer" />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60 text-sm tracking-wide"
      >
        {pending ? "Publishing…" : "Publish Listing"}
      </button>
    </form>
  );
}
