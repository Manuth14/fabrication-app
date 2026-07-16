"use client";
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import { addProductAction } from "@/src/actions/product";
import { OurFileRouter } from "../../api/uploadthing/core";

export default function UploadForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <form action={addProductAction} className="bg-white p-6 rounded-lg shadow mb-8 flex gap-4 items-center">
      <input name="name" placeholder="Product Name" required className="border p-2 rounded" />
      <input name="price" type="number" placeholder="Price" required className="border p-2 rounded" />
      
      <input type="hidden" name="imageUrl" value={imageUrl} />
      
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          setImageUrl(res[0].url);
          alert("Upload Completed!");
        }}
        onUploadError={(err: Error) => {
          alert(`ERROR! ${err.message}`);
        }}
      />
      
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}