// src/app/dashboard/page.tsx
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/src/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fabrication Pro Dashboard</h1>
        <form action={async () => {
          "use server";
          await signOut();
        }}>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Projects</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Pending Costs</h2>
          <p className="text-3xl font-bold mt-2 text-orange-500">Rs. 0</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">Rs. 0</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
        <p className="text-gray-500">No projects added yet.</p>
      </div>
    </div>
  );
}