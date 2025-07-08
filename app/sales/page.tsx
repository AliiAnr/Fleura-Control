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
  const [loadingActive, setLoadingActive] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);

  const fetchActiveOrders = async () => {
    setLoadingActive(true);
    try {
      const res = await api.get("/order/active");
      setActiveOrder(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingActive(false);
    }
  };
  const fetchCompletedOrders = async () => {
    setLoadingCompleted(true);
    try {
      const res = await api.get("/order/completed");
      setCompletedOrder(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingCompleted(false);
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
              {loadingActive
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : activeOrder.map((order) => (
                    <div key={order.id}>
                      <ItemRow
                        name={order.orderItems?.[0]?.product?.name || order.id}
                        image={
                          order.orderItems?.[0]?.product?.picture?.[0]?.path ||
                          "images/order_default.png"
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
              {loadingCompleted
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <ItemRow key={idx} isLoading name="" image="" />
                  ))
                : completedOrder.map((order) => (
                    <div key={order.id}>
                      <ItemRow
                        name={order.orderItems?.[0]?.product?.name || order.id}
                        image={
                          order.orderItems?.[0]?.product?.picture?.[0]?.path ||
                          "images/order_default.png"
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