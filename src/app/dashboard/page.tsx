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
          </header>

          <AdminDashboard />
        </div>
      </main>
    </>
  );
}
