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
  if (!user) {
    return { error: "You must be logged in to list a property." };
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = Number(formData.get("price"));
  const type = formData.get("type") as string;
  const beds = Number(formData.get("beds"));
  const baths = Number(formData.get("baths"));
  const sqft = Number(formData.get("sqft"));
  const address = (formData.get("address") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const tag = (formData.get("tag") as string)?.trim() || null;

  if (!title || !price || !type || !beds || !baths || !sqft || !address || !city) {
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

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }

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
    beds,
    baths,
    sqft,
    address,
    city,
    image_url: imageUrl,
    tag,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/properties");
  redirect("/properties");
}
