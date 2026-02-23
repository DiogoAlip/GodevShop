import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { products } from "@/mocks/products.mock";

export const HomePage = () => {
  return (
    <>
      <CustomJumbotron title="Todos los Productos" />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={5} />
    </>
  );
};
