import DashboardNavbar from "@/components/dashboard-navbar";
import AdminDashboard from "@/components/admin-dashboard";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check user role
  const { data: roleData, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  const userRole = roleData?.role || "student";

  console.log("Dashboard - User:", user.email, "Role:", userRole, "Error:", error?.message);

  // Only admins can access this page
  if (userRole !== "admin") {
    return (
      <>
        <DashboardNavbar />
        <main className="min-h-screen bg-[#FAFBFC]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E4E7EB]">
              <h1 className="text-2xl font-bold text-navy mb-4">Access Denied</h1>
              <p className="text-[#5F6B7A] mb-4">
                You don't have permission to access the admin dashboard.
              </p>
              <a href="/" className="text-navy underline">Go to Home</a>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <header className="mb-8">
            <h1 className="font-display text-3xl font-bold text-navy">
              Admin Dashboard
            </h1>
            <p className="text-[#5F6B7A] mt-2">
              Manage student applications and review submissions
            </p>
            <p className="text-xs text-green-600 mt-1">
              Logged in as: {user.email} (Role: {userRole})
            </p>
          </header>

          <AdminDashboard />
        </div>
      </main>
    </>
  );
}
