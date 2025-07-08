"use client";
import { Buyer, Seller } from "@/types/api";
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

export default function UserPage() {
  const router = useRouter();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loadingBuyers, setLoadingBuyers] = useState(true);
  const [loadingSellers, setLoadingSellers] = useState(true);

  const fetchBuyers = async () => {
    setLoadingBuyers(true);
    try {
      const res = await api.get("/buyer");
      setBuyers(res.data.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    } finally {
      setLoadingBuyers(false);
    }
  };
  const fetchSellers = async () => {
    setLoadingSellers(true);
    try {
      const res = await api.get("/seller");
      setSellers(res.data.data);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    } finally {
      setLoadingSellers(false);
    }
  };
  useEffect(() => {
    fetchBuyers();
    fetchSellers();
  }, []);

  return (
    <div>
      <p className="text-2xl font-semibold mb-4">User</p>
      <Tabs defaultValue="tab1">
        <TabsList className="grid w-full grid-cols-2" variant="solid">
          <TabsTrigger value="tab1">Buyer</TabsTrigger>
          <TabsTrigger value="tab2">Merchant</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="tab1">
            <div className="space-y-2">
              {loadingBuyers
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : buyers.map((buyer) => (
                    <div key={buyer.id}>
                      <ItemRow
                        name={buyer.name || buyer.email}
                        image={"images/user_default.png"}
                        onClick={() => {
                          router.push(`/users/buyer/detail/${buyer.id}`);
                        }}
                      />
                    </div>
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="space-y-2">
              {loadingSellers
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : sellers.map((seller) => (
                    <div key={seller.id}>
                      <ItemRow
                        name={seller.name || seller.email}
                        image={seller.picture || "images/user_default.png"}
                        onClick={() => {
                          router.push(`/users/seller/detail/${seller.id}`);
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