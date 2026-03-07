import { useParams, useSearchParams } from "react-router";
import { getProductsAction } from "../actions/getProducts.action";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();
  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || "";
  const price = searchParams.get("price") || "";
  const query = searchParams.get("query") || "";

  const [minPrice, maxPrice] =
    price !== "any"
      ? price.split("-").map((strPrice) => Number(strPrice))
      : [undefined, undefined];

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: [
      "products",
      { page, limit, sizes, gender, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes,
        gender,
        minPrice,
        maxPrice,
        q: query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
