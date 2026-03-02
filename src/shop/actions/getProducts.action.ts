import { GoDevApi } from "@/api/GodevApi";
import type { ProductResponse } from "@/interfaces/products.response";

export const getProductsAction = async (): Promise<ProductResponse> => {
  const { data } = await GoDevApi.get<ProductResponse>("/products");

  const productsWithImageURLs = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return {
    ...data,
    products: productsWithImageURLs,
  };
};
