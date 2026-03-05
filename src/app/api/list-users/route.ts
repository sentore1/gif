import { NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client";

export async function GET() {
  try {
    const supabase = createClient();

    // Get all applications to see who submitted
    const { data: applications, error: appError } = await supabase
      .from('applications')
      .select('first_name, surname, id_number, program, created_at')
      .order('created_at', { ascending: false });

    return NextResponse.json({ 
      applications: applications || [],
      count: applications?.length || 0,
      error: appError?.message || null
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message
    }, { status: 500 });
  }
}
