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
import { formatRupiah } from "@/helper/idrConvert"; // Pastikan ini diimpor
import api from "@/service/api";
import {
  AdminProductReview,
  AdminsStatus,
  APIResponse,
  Order,
  OrderStatus,
  PaymentStatus, // Penting: Pastikan ini diimpor jika digunakan
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
import { io, Socket } from "socket.io-client";

// Interfaces untuk data WebSocket
interface WsOrderStatusData {
  orderId: string;
  status: OrderStatus;
  message?: string;
}

interface WsPaymentStatusData {
  orderId: string; // Tambahkan orderId di sini untuk filtering yang lebih mudah

  status: PaymentStatus;
  message?: string;
}

export default function OrderDetailPage() {
  // const { id } = useParams();
  // const id = useParams()?.id as string | undefined;
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [order, setOrder] = useState<Order | null>(null); // Inisialisasi dengan null untuk penanganan lebih baik
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    OrderStatus.CREATED
  );

  const [socket, setSocket] = useState<Socket | null>(null);

  // Pastikan URL ini diatur di file .env.local atau .env.development/.env.production
  const NESTJS_WEBSOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
  // const roomId = id ?? null;

  // Fungsi untuk memperbarui orderStatus dari dropdown
  function changeOrderStatus(status: OrderStatus) {
    setOrderStatus(status);
  }

  const fetchOrder = async () => {
    try {
      const res = await api.get("/order/detail/" + id);
      const fetchedOrder: Order = res.data.data;
      setOrder(fetchedOrder);

      // Inisialisasi orderStatus dari data yang diambil
      if (fetchedOrder?.status) {
        setOrderStatus(fetchedOrder.status);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details.");
    } finally {
      setLoadingPage(false);
    }
  };

  console.log("Parsed orderId from params:", id);


  // --- WebSocket Connection and Event Handling ---
  useEffect(() => {
    // Pastikan roomId (orderId) dan URL WebSocket tersedia sebelum mencoba koneksi
    if (!id || !NESTJS_WEBSOCKET_URL) {
      console.warn("WebSocket connection skipped: roomId or URL missing.");
      return;
    }

    const newSocket = io(NESTJS_WEBSOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected to WebSocket server for Order ID: ${id}`);
      newSocket.emit("joinRoom", id); // Bergabung ke room dengan orderId
    });

    // Listener untuk update status pesanan
    newSocket.on("order:statusChanged", (data: WsOrderStatusData) => {
      console.log("Order status update received:", data);
      // Perbarui status pesanan jika ID cocok
      if (data.orderId === id) {
        setOrderStatus(data.status); // Update state untuk dropdown dan stepper
        // Perbarui objek order juga untuk data lainnya
        setOrder((prevOrder) =>
          prevOrder ? { ...prevOrder, status: data.status } : prevOrder
        );
        toast.success(`Order ${data.orderId} status changed to ${data.status}`);
      }
    });

    // Listener untuk update status pembayaran
    newSocket.on("payment:statusChanged", (data: WsPaymentStatusData) => {
      console.log("Payment status update received:", data);
      // Perbarui status pembayaran jika orderId cocok
      if (data.orderId === id) {
        // Membandingkan dengan orderId dari payload
        setOrder((prevOrder) =>
          prevOrder
            ? {
                ...prevOrder,
                payment: { ...prevOrder.payment, status: data.status },
              }
            : prevOrder
        );
        toast.success(
          `Payment status for order ${data.orderId} changed to ${data.status}`
        );
      }
    });

    newSocket.on("disconnect", () => {
      console.log(
        `Disconnected from WebSocket server for Order ID: ${id}.`
      );
    });

    newSocket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message);
      toast.error(`WebSocket connection error: ${error.message}`);
    });

    // Cleanup function: Tutup koneksi saat komponen di-unmount atau roomId berubah
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log(`WebSocket connection for Order ID: ${id} closed.`);
      }
    };
  }, [id]); // Tambahkan NESTJS_WEBSOCKET_URL sebagai dependency

  // --- End WebSocket Connection and Event Handling ---

  // Efek untuk memuat data pesanan saat ID berubah
  useEffect(() => {
    setLoadingPage(true);
    fetchOrder();
  }, [id]);

  // Hapus useEffect ini karena inisialisasi orderStatus sudah dilakukan di fetchOrder
  // useEffect(() => {
  //   if (order?.status) {
  //     setOrderStatus(order.status);
  //   }
  // }, [order]);

  // Fungsi untuk menangani update status pesanan melalui API
  const handleUpdateOrderStatus = async () => {
    setLoading(true);
    const toastId = toast.loading("Saving order status...");
    try {
      // Mengirim status yang dipilih di dropdown ke backend
      const res = await api.put<APIResponse<ProductReviewResponse>>(
        "order/status/" + id,
        {
          status: orderStatus,
        }
      );
      toast.success("Order status updated successfully!", { id: toastId });
      // TIDAK PERLU MEMANGGIL fetchOrder() DI SINI
      // Karena NestJS akan memancarkan event WebSocket yang akan mengupdate UI secara real-time
    } catch (err) {
      toast.error("Failed to update order status.", { id: toastId });
      console.error("Error updating order status:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <div>
        <p className="text-xl font-light mb-4">Order Detail</p>
        <Card className="flex p-6 space-x-6 w-9/12 animate-pulse">
          <div className="space-y-2 w-1/2">
            <div className="mb-4 bg-[#F5CEE0] rounded-xl w-full h-[350px]" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/3 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/4 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-1/2 mb-2" />
            <div className="h-5 bg-[#F5CEE0] rounded w-full mb-2" />
          </div>
          <div className="space-y-2 w-1/2">
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

  // Jika order null setelah loadingPage selesai (misal, order tidak ditemukan)
  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Order not found.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xl font-light mb-4">Order Detail</p>{" "}
      {/* Judul lebih sesuai */}
      <Card className="flex p-6 space-x-6 w-9/12">
        <div className="space-y-2 w-1/2">
          <div className="mb-4">
            <Image
              src={
                order.orderItems?.[0]?.product?.picture?.[0]?.path ||
                "/images/product_default.png" // Menggunakan absolute path
              }
              alt={order.orderItems?.[0]?.product?.name || "Product Image"}
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
            <p className="text-medium">Order Summary:</p>
          </div>
          <div>
            {order.orderItems?.map((product) => (
              <div className="flex justify-between text-sm" key={product.id}>
                <div className="flex gap-2">
                  <p className="font-semibold">{product.quantity}x</p>
                  <p>{product.product.name}</p>
                </div>
                <div>
                  <p className="font-semibold">
                    {formatRupiah(product.product.price * product.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <OrderStatusStepper status={orderStatus} />
        </div>
        <div className=" space-y-2 w-1/2">
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Total:</p>
            <p className="font-medium text-[#F06AA8] ">
              {formatRupiah(order.total || 0)}
            </p>
          </div>
          <div className="flex justify-between text-[0.9rem]">
            <p className="">Payment Status:</p>
            <p className="font-light">{order.payment?.status}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Payment Method:</p>
            <p className="font-light ">{order.payment?.methode}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Order Id:</p>
            <p className="font-light">{order.id}</p>
          </div>
          {order.taken_date && (
            <div className="text-[0.9rem]">
              <p className="">Delivery Date:</p>
              <p className="font-light">
                {formatTanggalIndoFromDate(new Date(order.taken_date))}
              </p>
            </div>
          )}
          <div className="text-[0.9rem]">
            <p className="">Note:</p>
            <p className="font-light text-gray-900">{order.note}</p>
          </div>
          <div className="text-[0.9rem]">
            <p className="">Order Status:</p>
            <SelectNative
              id="orderstatus"
              className="mt-2"
              value={orderStatus}
              onChange={(e) => changeOrderStatus(e.target.value as OrderStatus)}
            >
              <option value={OrderStatus.CREATED}>Created</option>
              <option value={OrderStatus.PICKUP}>Pickup</option>
              <option value={OrderStatus.PROCESS}>Process</option>
              <option value={OrderStatus.DELIVERY}>Delivery</option>
              <option value={OrderStatus.COMPLETED}>Completed</option>
            </SelectNative>
          </div>

          <div className="flex mt-4">
            <Button
              className="w-full"
              onClick={handleUpdateOrderStatus} // Panggil fungsi yang benar
              // loading={loading} // Tambahkan properti loading untuk tombol
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
