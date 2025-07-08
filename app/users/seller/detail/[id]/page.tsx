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
  SellerAddress,
  Store,
  StoreAddress,
} from "@/types/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SellerDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState<Seller>();
  const [sellerAddress, setSellerAddress] = useState<SellerAddress[]>();
  const [sellerReview, setSellerReview] = useState<AdminProductReview>();
  const [descReview, setDescReview] = useState("");
  const [reviewStatus, setReviewStatus] = useState<AdminsStatus>(
    AdminsStatus.NEED_REVIEW
  );

  function changeReviewStatus(status: AdminsStatus) {
    setReviewStatus(status);
  }
  const handleReview = async () => {
    setLoading(true);
    // Tampilkan loading toast
    const toastId = toast.loading("Menyimpan...");

    try {
      const res = await api.post<APIResponse<ProductReviewResponse>>(
        "admin/review/seller",
        {
          sellerId: id,
          description: descReview,
          status: reviewStatus,
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
  const fetchSeller = async () => {
    try {
      const res = await api.get("/seller/detail/" + id);
      //   console.log("Products:", res.data.data);
      setSeller(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
      console.log("data seller : "+res.data.data)
    } catch (error) {
      console.error("Error fetching seller:", error);
    }
  };
  const fetchSellerAddress = async () => {
    try {
      const res = await api.get("/seller/address?userId=" + id);
      //   console.log("Products:", res.data.data);
      setSellerAddress(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);

    } catch (error) {
      console.error("Error fetching buyer address:", error);
    }
  };
  const fetchSellerReview = async () => {
    try {
      console.log(id);
      const res = await api.get("admin/review/seller/" + id);
      //   console.log("Products:", res.data.data);
      setSellerReview(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
      console.log(res);
      console.log(sellerReview);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchSeller();
    fetchSellerAddress();
    
  }, [id]);

  useEffect(() => {
    if (seller?.id) {
      console.log("data seller "+seller)
      fetchSellerReview();
    }
  }, [seller]);

  return (
    <div>
      <p className="text-xl font-light mb-4">Seller</p>
      <Card className="flex p-6 space-x-6 w-9/12">
        <div className="space-y-2 w-1/2">
          {/* <div className="flex justify-between text-[0.9rem]">
            <p className="text-2xl font-medium">Seller Information</p>
          </div> */}
          <div className="mb-4">
            <Image
              src={seller?.picture || "images/user_default.png"}
              alt={seller?.name || "User Image"}
              width={350}
              height={350}
              unoptimized
              className={`rounded-xl w-full ${!seller?.picture && "bg-[#f6dfea] animate-pulse"}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/user_default.png";
              }}
            />
          </div>

          <div className="flex justify-between text-[0.9rem]">
            <p className="">Name:</p>
            <p className="font-light">{seller?.name}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Email:</p>
            <p className="font-light">{seller?.email}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Phone:</p>
            <p className="font-light">{seller?.phone}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Address:</p>
            <p className="font-light text-gray-500">{`${sellerAddress?.[0]?.road}, ${sellerAddress?.[0]?.detail}, ${sellerAddress?.[0]?.district}, ${sellerAddress?.[0]?.city}, ${sellerAddress?.[0]?.province}, ${sellerAddress?.[0]?.postcode}`}</p>
          </div>
        </div>
        <div className="space-y-2 w-1/2">
          <div className={`mb-4 `}>
            <Image
              src={seller?.identity_number || "images/identity_card_default.png"}
              alt={seller?.name || "User Identity Image"}
              width={350}
              height={350}
              unoptimized
              className={`rounded-xl w-full ${!seller?.identity_number && "bg-[#f6dfea] animate-pulse h-[19rem]"}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/identity_card_default.png";
              }}
            />
          </div>

          <div className="flex justify-between text-[0.9rem]">
            <p className="">Identity Number:</p>
            <p className="font-light">{seller?.identity_number}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Account Number:</p>
            <p className="font-light">{seller?.account}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Status:</p>
            <p className="font-light">
              {adminReviewStatusConv(
                sellerReview?.status || AdminsStatus.NEED_REVIEW
              )}
            </p>
          </div>
          <p className="text-2xl font-medium">Admin Information</p>
          <div className="flex flex-col  text-[0.9rem] space-y-2">
            <p className="">Description:</p>
            <Textarea
              placeholder="Review..."
              value={descReview}
              onChange={(e) => setDescReview(e.target.value)}
            />
          </div>
          <div className="flex justify-stretch space-x-2 mt-6">
            <Button
              variant="accepted"
              className="w-full"
              onClick={() => changeReviewStatus(AdminsStatus.ACCEPTED)}
            >
              {" "}
              Accept{" "}
            </Button>
            <Button
              variant="need_review"
              className="w-full"
              onClick={() => changeReviewStatus(AdminsStatus.NEED_REVIEW)}
            >
              {" "}
              Need Review{" "}
            </Button>
            <Button
              variant="reject"
              className="w-full"
              onClick={() => changeReviewStatus(AdminsStatus.REJECTED)}
            >
              {" "}
              Reject{" "}
            </Button>
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
