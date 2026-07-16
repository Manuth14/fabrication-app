import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import UploadForm from "./upload-form";

export default async function ProductsPage() {
  const productList = await db.select().from(products);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Products</h1>
      
      {/* අලුතින් එකතු කළ Form එක */}
      <UploadForm />
      
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                )}
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">Rs. {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}