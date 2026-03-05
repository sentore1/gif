import { NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client";

export async function GET() {
  try {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({ 
      email: user.email,
      userId: user.id,
      role: roleData?.role || "student",
      error: error?.message || null
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message
    }, { status: 500 });
  }
}
