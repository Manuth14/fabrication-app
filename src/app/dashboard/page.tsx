// src/app/dashboard/page.tsx
import { auth, signOut } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { addProjectAction } from "@/src/actions/projects";
import { db } from "@/src/lib/db";
import { projects } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const projectList = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, session.user!.id!));

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fabrication Pro Dashboard</h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </form>
      </div>

      {/* Add New Project Form */}
      <form
        action={async (formData: FormData) => {
          "use server";
          await addProjectAction(formData);
        }}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <div className="flex gap-4">
          <input
            name="projectName"
            placeholder="Project Name"
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="cost"
            type="number"
            placeholder="Cost (Rs)"
            required
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Add
          </button>
        </div>
      </form>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Projects</h2>
          <p className="text-3xl font-bold mt-2">{projectList.length}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Cost</h2>
          <p className="text-3xl font-bold mt-2 text-orange-500">
            Rs. {projectList.reduce((acc, p) => acc + Number(p.cost), 0)}
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
        {projectList.length > 0 ? (
          <div className="grid gap-4">
            {projectList.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 border rounded shadow-sm flex justify-between items-center"
              >
                <span className="font-medium">{p.projectName}</span>
                <span className="font-bold text-green-700">Rs. {p.cost}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No projects added yet.</p>
        )}
      </div>
    </div>
  );
}
