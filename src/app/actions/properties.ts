"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProperty(
  _state: { error?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in to list a property." };

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = Number(formData.get("price"));
  const type = formData.get("type") as string;
  const property_type = formData.get("property_type") as string;
  const beds = Number(formData.get("beds"));
  const baths = Number(formData.get("baths"));
  const sqft = Number(formData.get("sqft"));
  const parking = Number(formData.get("parking")) || 0;
  const year_built = formData.get("year_built") ? Number(formData.get("year_built")) : null;
  const address = (formData.get("address") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const neighborhood = (formData.get("neighborhood") as string)?.trim() || null;
  const tag = (formData.get("tag") as string)?.trim() || null;
  const amenities = formData.getAll("amenities") as string[];

  if (!title || !price || !type || !address || !city) {
    return { error: "Please fill in all required fields." };
  }

  let imageUrl: string | null = null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(fileName, imageFile, { contentType: imageFile.type });

    if (uploadError) return { error: `Image upload failed: ${uploadError.message}` };

    const { data: urlData } = supabase.storage
      .from("property-images")
      .getPublicUrl(fileName);
    imageUrl = urlData.publicUrl;
  }

  const { error } = await supabase.from("properties").insert({
    user_id: user.id,
    title,
    description,
    price,
    type,
    property_type,
    beds,
    baths,
    sqft,
    parking,
    year_built,
    address,
    city,
    neighborhood,
    image_url: imageUrl,
    amenities,
    tag,
  });

  if (error) return { error: error.message };

  revalidatePath("/properties");
  redirect("/properties");
}

export async function deleteProperty(propertyId: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId)
    .eq("user_id", user.id);

  revalidatePath("/properties");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
