import { useEffect } from "react";
import Products from "./components/examples/ProductListExample";
import { useProductStore } from "./stores/useProductStore";

export default function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h1>The Alpha Network</h1>
      <Products />
    </div>
  );
}