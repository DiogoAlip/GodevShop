import { GoDevApi } from "@/api/GodevApi";
import type { ProductResponse } from "@/interfaces/products.response";

interface Options {
  limit?: number | string | undefined;
  offset?: number | string | undefined;
  sizes?: string;
  gender?: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  q?: string | undefined;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductResponse> => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, q } = options;

  const { data } = await GoDevApi.get<ProductResponse>("/products", {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q,
    },
  });

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
