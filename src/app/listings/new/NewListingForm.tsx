"use client";

import { useActionState } from "react";
import { createProperty } from "@/app/actions/properties";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background";
const labelClass = "text-sm font-medium text-foreground mb-1 block";

export default function NewListingForm() {
  const [state, action, pending] = useActionState(createProperty, undefined);

  return (
    <form action={action} className="flex flex-col gap-5">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      {/* Basic info */}
      <div>
        <label className={labelClass}>Title *</label>
        <input name="title" type="text" required placeholder="e.g. Modern 3-Bed Apartment in Downtown" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={4} placeholder="Describe the property…" className={`${inputClass} resize-none`} />
      </div>

      {/* Type + Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Listing Type *</label>
          <select name="type" required className={inputClass}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Price (USD) *</label>
          <input name="price" type="number" required min={1} placeholder="e.g. 850000" className={inputClass} />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Bedrooms *</label>
          <input name="beds" type="number" required min={0} placeholder="3" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Bathrooms *</label>
          <input name="baths" type="number" required min={0} placeholder="2" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sqft *</label>
          <input name="sqft" type="number" required min={1} placeholder="1500" className={inputClass} />
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Street Address *</label>
          <input name="address" type="text" required placeholder="123 Main St" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>City, State *</label>
          <input name="city" type="text" required placeholder="San Francisco, CA" className={inputClass} />
        </div>
      </div>

      {/* Tag + Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tag (optional)</label>
          <input name="tag" type="text" placeholder="e.g. Featured, New, Hot Deal" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Property Photo (optional)</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:text-sm file:font-semibold hover:file:bg-primary-light cursor-pointer"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60 mt-2"
      >
        {pending ? "Publishing…" : "Publish Listing"}
      </button>
    </form>
  );
}
