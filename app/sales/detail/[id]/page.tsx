/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import OrderStatusStepper from "@/components/OrderStep";
import { Button } from "@/components/tremor/Button";
import { Card } from "@/components/tremor/Card";
import { SelectNative } from "@/components/tremor/SelectNative";
import { Textarea } from "@/components/tremor/Textarea";
import { adminReviewStatusConv } from "@/helper/adminReview";
import { formatTanggalIndoFromDate } from "@/helper/dateConvert";
import { formatRupiah } from "@/helper/idrConvert";
import api from "@/service/api";
import {
  AdminProductReview,
  AdminsStatus,
  APIResponse,
  Order,
  OrderStatus,
  Product,
  ProductReviewResponse,
  Seller,
  Store,
  StoreAddress,
} from "@/types/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order>();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    OrderStatus.CREATED
  );

  function changeOrdertatus(status: OrderStatus) {
    setOrderStatus(status);
  }

  const fetchOrder = async () => {
    try {
      const res = await api.get("/order/detail/" + id);
      //   console.log("Products:", res.data.data);
      setOrder(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    if (order?.status) {
      setOrderStatus(order.status);
    }
  }, [order]);

  const handleReview = async () => {
    setLoading(true);
    // Tampilkan loading toast
    const toastId = toast.loading("Menyimpan...");

    try {
      const res = await api.put<APIResponse<ProductReviewResponse>>(
        "order/status/" + id,
        {
          status: orderStatus,
        }
      );
      toast.success("Berhasil Menyimpan!", { id: toastId });
    } catch (err) {
      toast.error("Gagal Menyimpan.", { id: toastId });

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return (
    <div>
      <p className="text-xl font-light mb-4">Review Product</p>
      <Card className="flex p-6 space-x-6 w-9/12">
        <div className="space-y-2 w-1/2">
          <div className="mb-4">
            <Image
              src={
                order?.orderItems?.[0]?.product?.picture?.[0]?.path ||
                "images/product_default.png"
              }
              alt={order?.orderItems?.[0]?.product?.name || "Product Image"}
              width={350}
              height={350}
              unoptimized
              className="rounded-xl w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/product_default.png";
              }}
            />
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="text-medium txe">Order Summary:</p>
          </div>
          <div>
            {order?.orderItems?.map((product) => (
              <div className="flex justify-between text-sm" key={product.id}>
                <div className="flex gap-2">
                  <p className="font-semibold">{product.quantity}x</p>
                  <p>{product.product.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Rp {product.product.price * product.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <OrderStatusStepper status={order?.status || OrderStatus.PROCESS} />
        </div>
        <div className=" space-y-2 w-1/2">
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Total:</p>
            <p className="font-medium text-[#F06AA8] ">Rp {order?.total}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Payment Status:</p>
            <p className="font-light">{order?.payment?.status}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Payment Method:</p>
            <p className="font-light ">{order?.payment?.methode}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Order Id:</p>
            <p className="font-light">{order?.id}</p>
          </div>
          {order?.taken_date && (
            <div className="text-[0.9rem]">
              <p className="">Delivery Date:</p>
              <p className="font-light">
                {formatTanggalIndoFromDate(new Date(order.taken_date))}
              </p>
            </div>
          )}
          <div className="text-[0.9rem]">
            <p className="">Note:</p>
            <p className="font-light text-gray-900">{order?.note}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Order Status:</p>
            <SelectNative
              id="orderstatus"
              className="mt-2"
              value={orderStatus}
              onChange={(e) => changeOrdertatus(e.target.value as OrderStatus)}
            >
              <option value={OrderStatus.CREATED}>Created</option>
              <option value={OrderStatus.PICKUP}>Pickup</option>
              <option value={OrderStatus.PROCESS}>Process</option>
              <option value={OrderStatus.DELIVERY}>Delivery</option>
              <option value={OrderStatus.COMPLETED}>Completed</option>
            </SelectNative>
          </div>

          <div className="flex mt-4">
            <Button className="w-full" onClick={() => handleReview()}>
              {" "}
              Save{" "}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
