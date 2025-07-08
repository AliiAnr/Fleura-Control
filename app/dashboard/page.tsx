"use client";
import { ItemCard } from "@/components/ItemCard";
import { useEffect, useState } from "react";
import { Product, Store } from "@/types/api";
import api from "@/service/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingStores, setLoadingStores] = useState(true);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await api.get("/product/unverified");
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };
  const fetchStores = async () => {
    setLoadingStores(true);
    try {
      const res = await api.get("/store/unverified");
      setStores(res.data.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoadingStores(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, []);

  return (
    <div>
      <p className="text-2xl font-semibold mb-4">Dashboard</p>
      <p className="text-xl font-light mb-4">Product Review</p>
      <div className="flex gap-6">
        {loadingProducts
          ? Array.from({ length: 5 }).map((_, idx) => (
              <ItemCard key={idx} isLoading name="" image="" />
            ))
          : products.slice(0, 5).map((product) => (
              <div key={product.id}>
                <ItemCard
                  name={product.name}
                  image={
                    product.picture?.[0]?.path || "images/product_default.png"
                  }
                  category={product.category?.name}
                  price={product.price}
                  onClick={() => {
                    router.push(`/products/detail/${product.id}`);
                  }}
                />
              </div>
            ))}
      </div>
      <p className="text-xl font-light my-4">Manage Store</p>
      <div className="flex gap-6">
        {loadingStores
          ? Array.from({ length: 5 }).map((_, idx) => (
              <ItemCard key={idx} isLoading name="" image="" />
            ))
          : stores.slice(0, 5).map((store) => (
              <div key={store.id}>
                <ItemCard
                  name={store.name}
                  image={store.logo || "images/store_default.png"}
                  onClick={() => {
                    router.push(`/stores/detail/${store.id}`);
                  }}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
