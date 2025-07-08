"use client";
import { Product } from "@/types/api";
import { useEffect, useState } from "react";
import api from "@/service/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tremor/Tabs";
import { ItemRow } from "@/components/ItemRow";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [unverifProducts, setUnverifProducts] = useState<Product[]>([]);
  const [verifProducts, setVerifProducts] = useState<Product[]>([]);
  const [loadingUnverif, setLoadingUnverif] = useState(true);
  const [loadingVerif, setLoadingVerif] = useState(true);

  const fetchUnverifiedProducts = async () => {
    setLoadingUnverif(true);
    try {
      const res = await api.get("/product/unverified");
      setUnverifProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingUnverif(false);
    }
  };
  const fetchVerifiedProducts = async () => {
    setLoadingVerif(true);
    try {
      const res = await api.get("/product/verified");
      setVerifProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingVerif(false);
    }
  };
  useEffect(() => {
    fetchUnverifiedProducts();
    fetchVerifiedProducts();
  }, []);

  return (
    <div>
      <p className="text-2xl font-semibold mb-4">Product</p>
      <Tabs defaultValue="tab1">
        <TabsList className="grid w-full grid-cols-2" variant="solid">
          <TabsTrigger value="tab1">Review Product</TabsTrigger>
          <TabsTrigger value="tab2">Accepted Product</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="tab1">
            <div className="space-y-2">
              {loadingUnverif
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : unverifProducts.map((product) => (
                    <div key={product.id}>
                      <ItemRow
                        name={product.name}
                        image={product.picture?.[0]?.path || "images/product_default.png"}
                        onClick={() => {
                          router.push(`/products/detail/${product.id}`);
                        }}
                      />
                    </div>
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="space-y-2">
              {loadingVerif
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : verifProducts.map((product) => (
                    <div key={product.id}>
                      <ItemRow
                        name={product.name}
                        image={product.picture?.[0]?.path || "images/product_default.png"}
                        onClick={() => {
                          router.push(`/products/detail/${product.id}`);
                        }}
                      />
                    </div>
                  ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}