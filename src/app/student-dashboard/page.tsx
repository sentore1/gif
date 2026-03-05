import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function StudentDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user is admin
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  const userRole = roleData?.role || "student";

  console.log("Student Dashboard - User:", user.email, "Role:", userRole);

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <header className="mb-8">
            <h1 className="font-display text-3xl font-bold text-navy">
              Student Dashboard
            </h1>
            <p className="text-[#5F6B7A] mt-2">
              Welcome back, {user.email}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Role: {userRole}
            </p>
          </header>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E4E7EB]">
            <h2 className="text-xl font-semibold text-navy mb-4">
              Your Applications
            </h2>
            <p className="text-[#5F6B7A]">
              You don't have any applications yet. Visit the{" "}
              <a href="/apply" className="text-navy underline">
                application page
              </a>{" "}
              to submit one.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
