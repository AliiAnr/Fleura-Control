import { OrderStatus } from "@/types/api";
import { CheckCircle } from "lucide-react"; // Icon bisa diganti sesuai kebutuhan

interface Props {
  status: OrderStatus;
}

export default function OrderStatusStepper({ status }: Props) {
  const isProcessed = true;
  const isOnDelivery =
    status === OrderStatus.PICKUP ||
    status === OrderStatus.DELIVERY ||
    status === OrderStatus.COMPLETED;
  const isCompleted = status === OrderStatus.COMPLETED;

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {/* Processed */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-4 h-4 rounded-full ${
            isProcessed ? "bg-pink-400" : "bg-gray-400"
          }`}
        ></div>
        <span
          className={`mt-2 text-sm ${
            isProcessed ? "text-black font-medium" : "text-gray-500"
          }`}
        >
          Processed
        </span>
      </div>

      {/* Line */}
      <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>

      {/* On Delivery */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-4 h-4 rounded-full ${
            isOnDelivery ? "bg-pink-400" : "bg-gray-400"
          }`}
        ></div>
        <span
          className={`mt-2 text-sm ${
            isOnDelivery ? "text-black font-medium" : "text-gray-500"
          }`}
        >
          On Delivery
        </span>
      </div>

      {/* Line */}
      <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>

      {/* Completed */}
      <div className="flex flex-col items-center text-center">
        {isCompleted ? (
          <CheckCircle className="text-pink-400 w-5 h-5" />
        ) : (
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
        )}
        <span
          className={`mt-2 text-sm ${
            isCompleted ? "text-black font-medium" : "text-gray-500"
          }`}
        >
          Completed
        </span>
      </div>
    </div>
  );
}
