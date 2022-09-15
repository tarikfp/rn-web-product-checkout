import React, { useEffect } from "react";
import { ProductsAPI } from "../../api/products";

export default function useGetAllProductList() {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);

  useEffect(() => {
    const handleGetAllProducts = async () => {
      try {
        const products = await ProductsAPI.getAllProducts();

        if (products) {
          setProducts(products);
        }
      } catch (err) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    handleGetAllProducts();
  }, []);

  return { loading, products, hasError };
}
