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
  const [product, setProduct] = useState<Product>();
  const [store, setStore] = useState<Store>();
  const [storeAddress, setStoreAddress] = useState<StoreAddress>();
  const [seller, setSeller] = useState<Seller>();
  const [productReview, setProductReview] = useState<AdminProductReview>();
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
      //   console.log("Products:", res.data.data);
      setProduct(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchProductReview = async () => {
    try {
      console.log(id)
      const res = await api.get("admin/review/product/" + id);
      //   console.log("Products:", res.data.data);
      setProductReview(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
      console.log(res)
      console.log(productReview);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // const fetchStore = async () => {
  //   try {
  //     const res = await api.get("/store/detail/");
  //     //   console.log("Products:", res.data.data);
  //     setProduct(res.data.data);
  //     //   console.log("Products set:", products); // Log the first product to verify
  //     //   setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
  const fetchSeller = async () => {
    try {
      const res = await api.get("/seller/detail/" + product?.store?.sellerId);
      //   console.log("Products:", res.data.data);
      setSeller(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching seller:", error);
    }
  };
  const fetchStoreAddress = async () => {
    try {
      const res = await api.get("/store/address?storeId=" + product?.store?.id);
      //   console.log("Products:", res.data.data);
      setStoreAddress(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleReview = async () => {
    setLoading(true);
    // Tampilkan loading toast
    const toastId = toast.loading("Menyimpan...");

    try {
      console.log("productId: "+ id)
      console.log("description: "+ descReview)
      console.log("status: "+ reviewStatus)
      const res = await api.post<APIResponse<ProductReviewResponse>>(
        "admin/review/product",
        {
          productId: id,
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
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (product?.store?.id) {
      fetchStoreAddress();
      fetchSeller();
      fetchProductReview();
    }
  }, [product]);

  return (
    <div>
      <p className="text-xl font-light mb-4">Review Product</p>
      <Card className="flex p-6 space-x-6 w-9/12">
        <div className="space-y-2">
          <div className="mb-4">
            <Image
              src={product?.picture?.[0]?.path || ""}
              alt={product?.name || "Product Image"}
              width={350}
              height={350}
              unoptimized
              className="rounded-xl"
            />
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Name:</p>
            <p className="font-light">{product?.name}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Price:</p>
            <p className="font-light">{formatRupiah(product?.price || 0)}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Stok:</p>
            <p className="font-light">{product?.stock}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Arrange Time:</p>
            <p className="font-light">{product?.arrange_time}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Description:</p>
            <p className="font-light text-gray-500">{product?.description}</p>
          </div>
        </div>
        <div className=" space-y-2">
          <p className="text-2xl font-medium">Seller Information</p>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Nama Toko:</p>
            <p className="font-light">{product?.store?.name}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Address:</p>
            <p className="font-light text-gray-500">{`${storeAddress?.road}, ${storeAddress?.detail}, ${storeAddress?.district}, ${storeAddress?.city}, ${storeAddress?.province}, ${storeAddress?.postcode}`}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Phone:</p>
            <p className="font-light">{product?.store?.phone}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Email:</p>
            <p className="font-light">{seller?.email}</p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Status:</p>
            <p className="font-light">
              {adminReviewStatusConv(
                productReview?.status || AdminsStatus.NEED_REVIEW
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
