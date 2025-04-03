import { supabaseClient } from "@/lib/db";

export async function fetchProductById(id: string) {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
