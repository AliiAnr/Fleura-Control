/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Order } from "@/types/api";
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

export default function SalesPage() {
  const router = useRouter();
  const [activeOrder, setActiveOrder] = useState<Order[]>([]);
  const [completedOrder, setCompletedOrder] = useState<Order[]>([]);

  const fetchActiveOrders = async () => {
    try {
      const res = await api.get("/order/active");
      console.log("Products:", res.data.data);
      setActiveOrder(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      console.log(activeOrder);
    }
  };
  const fetchCompletedOrders = async () => {
    try {
      const res = await api.get("/order/completed");
      //   console.log("Products:", res.data.data);
      setCompletedOrder(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchActiveOrders();
    fetchCompletedOrders();
  }, []);

  return (
    <div>
      <p className="text-2xl font-semibold mb-4">Order</p>
      <Tabs defaultValue="tab1">
        <TabsList className="grid w-full grid-cols-2" variant="solid">
          <TabsTrigger value="tab1">Active</TabsTrigger>
          <TabsTrigger value="tab2">Completed</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="tab1">
            <div className="space-y-2">
              {activeOrder.map((order) => (
                <div key={order.id}>
                  <ItemRow
                    name={order.orderItems?.[0]?.product?.name || order.id}
                    image={
                      order.orderItems?.[0]?.product?.picture?.[0]?.path || "images/order_default.png"
                    }
                    onClick={() => {
                      router.push(`/sales/detail/${order.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="space-y-2">
              {completedOrder.map((order) => (
                <div key={order.id}>
                  <ItemRow
                    name={order.orderItems?.[0]?.product?.name || order.id}
                    image={
                      order.orderItems?.[0]?.product?.picture?.[0]?.path || "images/order_default.png"
                    }
                    onClick={() => {
                      router.push(`/sales/detail/${order.id}`);
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
