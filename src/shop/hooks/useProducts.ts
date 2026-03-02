import { getProductsAction } from "../actions/getProducts.action";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
  });
};
