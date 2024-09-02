import { createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "12MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
     console.log("file url", file.url);
    }),
} 