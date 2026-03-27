import { GoDevApi } from "@/api/GodevApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  await sleep(1500);

  const { id, /*user,*/ images = [], files = [], ...rest } = productLike;

  const isCreating = id === "new";

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  if (files.length > 0) {
    const newImageNames = await uploadFiles(files);
    images.push(...newImageNames);
  }

  const imagesToSafe = images.map((image) => {
    if (image.includes("http")) return image.split("/").pop() || "";
    return image;
  });

  const { data } = await GoDevApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...rest,
      images: imagesToSafe,
    },
  });

  console.log({ files });

  return {
    ...data,
    images: data.images.map((image) =>
      image.includes("http")
        ? image
        : `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  };
};

interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await GoDevApi<FileUploadResponse>({
      url: "/files/product",
      method: "post",
      data: formData,
    });

    return data.fileName;
  });

  const uploadFileNames = await Promise.all(uploadPromises);
  return uploadFileNames;
};
