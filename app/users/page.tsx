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

  const fetchBuyers = async () => {
    try {
      const res = await api.get("/buyer");
      //   console.log("Products:", res.data.data);
      setBuyers(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };
  const fetchSellers = async () => {
    try {
      const res = await api.get("/seller");
      //   console.log("Products:", res.data.data);
      setSellers(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching sellers:", error);
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
              {buyers.map((buyer) => (
                <div key={buyer.id}>
                  <ItemRow
                    name={buyer.name || buyer.email}
                    image={"images/user_default.png"}
                    onClick={() => {
                      router.push(`/users/detail/${buyer.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="space-y-2">
              {sellers.map((seller) => (
                <div key={seller.id}>
                  <ItemRow
                    name={seller.name || seller.email}
                    image={seller.picture || "images/user_default.png"}
                    onClick={() => {
                      router.push(`/users/detail/${seller.id}`);
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
