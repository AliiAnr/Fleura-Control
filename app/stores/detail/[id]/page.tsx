/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/tremor/Button";
import { Card } from "@/components/tremor/Card";
import { Textarea } from "@/components/tremor/Textarea";
import { adminReviewStatusConv } from "@/helper/adminReview";
import { formatRupiah } from "@/helper/idrConvert";
import api from "@/service/api";
import {
  AdminProductReview,
  AdminsStatus,
  AdminStoreReview,
  APIResponse,
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [store, setStore] = useState<Store>();
  const [storeAddress, setStoreAddress] = useState<StoreAddress>();
  const [seller, setSeller] = useState<Seller>();
  const [storeReview, setStoreReview] = useState<AdminStoreReview>();
  const [descReview, setDescReview] = useState("");
  const [reviewStatus, setReviewStatus] = useState<AdminsStatus>(
    AdminsStatus.NEED_REVIEW
  );

  function changeReviewStatus(status: AdminsStatus) {
    setReviewStatus(status);
  }

  const fetchStore = async () => {
    try {
      const res = await api.get("/store/detail?storeId=" + id);
      setStore(res.data.data);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const fetchStoreReview = async () => {
    try {
      const res = await api.get("admin/review/store/" + id);
      setStoreReview(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSeller = async () => {
    try {
      const res = await api.get("/seller/detail/" + store?.sellerId);
      setSeller(res.data.data);
    } catch (error) {
      console.error("Error fetching seller:", error);
    }
  };
  const fetchStoreAddress = async () => {
    try {
      const res = await api.get("/store/address?storeId=" + store?.id);
      setStoreAddress(res.data.data);
    } catch (error) {
      console.error("Error fetching store address:", error);
    }
  };

  const handleReview = async () => {
    setLoading(true);
    const toastId = toast.loading("Menyimpan...");
    try {
      const res = await api.post<APIResponse<ProductReviewResponse>>(
        "admin/review/store",
        {
          storeId: id,
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

  useEffect(() => {
    setLoadingPage(true);
    fetchStore();
  }, [id]);

  useEffect(() => {
    if (store?.id) {
      Promise.all([fetchStoreAddress(), fetchSeller(), fetchStoreReview()]).finally(() => {
        setLoadingPage(false);
      });
    }
  }, [store]);

  if (loadingPage) {
    return (
      <div>
        <p className="text-xl font-light mb-4">Review Store</p>
        <Card className="flex p-6 space-x-6 w-9/12 animate-pulse">
          <div className="w-1/2 space-y-2">
            <div className="mb-4 bg-[#F5CEE0] rounded-xl w-full h-[350px]" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/3 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/4 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-full mb-2" />
          </div>
          <div className="w-1/2 space-y-2">
            <div className="h-6 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-2/3 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/3 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-full mb-2" />
            <div className="h-10 bg-[#F5CEE0] rounded w-full mb-2" />
            <div className="h-10 bg-[#F5CEE0] rounded w-full mb-2" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xl font-light mb-4">Review Store</p>
      <Card className="flex p-6 space-x-6 w-9/12">
        <div className="w-1/2 space-y-2">
          <div className="mb-4 flex justify-center">
            <Image
              src={store?.logo || "/images/store_default.png"}
              alt={store?.name || "Store Image"}
              width={350}
              height={350}
              unoptimized
              className="rounded-xl w-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/store_default.png";
              }}
            />
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Name:</p>
            <p className="font-light">{store?.name}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Operational Day:</p>
            <p className="font-light">{store?.operational_day}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Operational Hour:</p>
            <p className="font-light">{store?.operational_hour}</p>
          </div>
          <div className="flex flex-col justify-between text-[0.9rem]">
            <p className="">Address:</p>
            <p className="font-light text-gray-500">{`${storeAddress?.road}, ${storeAddress?.detail}, ${storeAddress?.district}, ${storeAddress?.city}, ${storeAddress?.province}, ${storeAddress?.postcode}`}</p>
          </div>

          <div className="text-[0.9rem]">
            <p className="">Description:</p>
            <p className="font-light text-gray-500">{store?.description}</p>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          <p className="text-2xl font-medium">Seller Information</p>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Name:</p>
            <p className="font-light">{seller?.name}</p>
          </div>

          <div className="flex justify-between text-[0.9rem]">
            <p className="">Phone:</p>
            <p className="font-light">{seller?.phone}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Email:</p>
            <p className="font-light">{seller?.email}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Status:</p>
            <p className="font-light">
              {adminReviewStatusConv(
                storeReview?.status || AdminsStatus.NEED_REVIEW
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