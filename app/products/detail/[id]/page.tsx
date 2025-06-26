"use client";
import { Card } from "@/components/tremor/Card";
import { formatRupiah } from "@/helper/idrConvert";
import api from "@/service/api";
import { Product, Store, StoreAddress } from "@/types/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [store, setStore] = useState<Store>();
  const [storeAddress, setStoreAddress] = useState<StoreAddress>();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/detail/" + id);
      //   console.log("Products:", res.data.data);
      setProduct(res.data.data);
      //   console.log("Products set:", products); // Log the first product to verify
      //   setProducts(data);
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
  useEffect(() => {
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (product?.store?.id) {
      fetchStoreAddress();
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
            <p className="">Status:</p>
            {/* <p className="font-light">{product?}</p> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
