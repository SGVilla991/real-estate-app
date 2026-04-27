import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <NavbarClient user={user ? { email: user.email ?? "", name: user.user_metadata?.full_name ?? "" } : null} />;
}
