"use client";
import { Store } from "@/types/api";
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

export default function StorePage() {
  const router = useRouter();
  const [unverifStores, setUnverifStores] = useState<Store[]>([]);
  const [verifStore, setVerifStore] = useState<Store[]>([]);
  const [loadingUnverif, setLoadingUnverif] = useState(true);
  const [loadingVerif, setLoadingVerif] = useState(true);

  const fetchUnverifiedStores = async () => {
    setLoadingUnverif(true);
    try {
      const res = await api.get("/store/unverified");
      setUnverifStores(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingUnverif(false);
    }
  };
  const fetchVerifiedStores = async () => {
    setLoadingVerif(true);
    try {
      const res = await api.get("/store/verified");
      setVerifStore(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingVerif(false);
    }
  };
  useEffect(() => {
    fetchUnverifiedStores();
    fetchVerifiedStores();
  }, []);

  return (
    <div>
      <p className="text-2xl font-semibold mb-4">Store</p>
      <Tabs defaultValue="tab1">
        <TabsList className="grid w-full grid-cols-2" variant="solid">
          <TabsTrigger value="tab1">New Store</TabsTrigger>
          <TabsTrigger value="tab2">Accepted Store</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="tab1">
            <div className="space-y-2">
              {loadingUnverif
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : unverifStores.map((store) => (
                    <div key={store.id}>
                      <ItemRow
                        name={store.name}
                        image={store.logo || "images/store_default.png"}
                        onClick={() => {
                          router.push(`/stores/detail/${store.id}`);
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
                : verifStore.map((store) => (
                    <div key={store.id}>
                      <ItemRow
                        name={store.name}
                        image={store.logo || "images/store_default.png"}
                        onClick={() => {
                          router.push(`/stores/detail/${store.id}`);
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