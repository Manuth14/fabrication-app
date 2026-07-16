import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // මෙතන middleware එකක් ඕනේ වෙන්න පුළුවන්
    .middleware(async () => {
      return { userId: "user_123" }; // මේක තාවකාලිකව දාන්න, පස්සේ auth එකට මාරු කරන්න පුළුවන්
    })
    .onUploadComplete(async ({ file }) => {
      console.log("File URL:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;