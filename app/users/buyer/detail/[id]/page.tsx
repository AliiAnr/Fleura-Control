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
  Buyer,
  BuyerAddress,
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

export default function UserDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [buyer, setBuyer] = useState<Buyer>();
  const [buyerAddress, setBuyerAddress] = useState<BuyerAddress[]>();

  const fetchBuyer = async () => {
    try {
      const res = await api.get("/buyer/detail/" + id);
      setBuyer(res.data.data);
    } catch (error) {
      console.error("Error fetching buyer:", error);
    }
  };
  const fetchBuyerAddress = async () => {
    try {
      const res = await api.get("/buyer/address?userId=" + id);
      setBuyerAddress(res.data.data);
    } catch (error) {
      console.error("Error fetching buyer address:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBuyer(), fetchBuyerAddress()]).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div>
        <p className="text-xl font-light mb-4">Buyer</p>
        <Card className="flex p-6 space-x-6 w-5/12 animate-pulse">
          <div className="space-y-2 w-full">
            <div className="mb-4 bg-[#F5CEE0] rounded-xl w-full h-[350px]" />
            <div className="h-6 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/3 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/4 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-full mb-2" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xl font-light mb-4">Buyer</p>
      <Card className="flex p-6 space-x-6 w-5/12">
        <div className="space-y-2 w-full">
          <div className="mb-4">
            <Image
              src={"images/user_default.png"}
              alt={buyer?.name || "User Image"}
              width={350}
              height={350}
              unoptimized
              className="rounded-xl w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/user_default.png";
              }}
            />
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="text-2xl font-medium">Buyer Information</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Name:</p>
            <p className="font-light">{buyer?.name}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Email:</p>
            <p className="font-light">{buyer?.email}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Phone:</p>
            <p className="font-light">{buyer?.phone}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Address:</p>
            <p className="font-light text-gray-500">{`${buyerAddress?.[0]?.road}, ${buyerAddress?.[0]?.detail}, ${buyerAddress?.[0]?.district}, ${buyerAddress?.[0]?.city}, ${buyerAddress?.[0]?.province}, ${buyerAddress?.[0]?.postcode}`}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}