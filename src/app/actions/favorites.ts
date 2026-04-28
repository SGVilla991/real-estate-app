"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleFavorite(propertyId: string, isFavorited: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  if (isFavorited) {
    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("property_id", propertyId);
  } else {
    await supabase
      .from("favorites")
      .insert({ user_id: user.id, property_id: propertyId });
  }

  revalidatePath("/properties");
  revalidatePath(`/properties/${propertyId}`);
  revalidatePath("/dashboard/favorites");
  return { success: true };
}

export async function getFavoriteIds(): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("favorites")
    .select("property_id")
    .eq("user_id", user.id);

  return data?.map((f) => f.property_id) ?? [];
}
