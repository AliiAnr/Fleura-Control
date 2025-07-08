import { formatRupiah } from "@/helper/idrConvert";
import { Card } from "./tremor/Card";
import Image from "next/image";
import { Button } from "./tremor/Button";

export const ItemCard = ({
  name,
  image,
  category,
  price,
  isLoading,
  onClick,
  className,
}: ItemProps & { className?: string; onClick?: () => void }) => {
  return (
    <Card className={className}>
      {isLoading ? (
        <div className="flex items-center justify-center h-[20rem] animate-pulse bg-[#F5CEE0] rounded-lg"></div>
      ) : (
        <>
          <div className="mb-4">
            <Image
              src={image || "/images/product_default.png"}
              alt={name}
              width={200}
              height={200}
              unoptimized
              className="rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/product_default.png";
              }}
            />
          </div>
          <p className="mb-2 font-semibold">{name}</p>
          {category && (
            <div className="flex justify-between text-[0.9rem]">
              <p className="font-light">Category:</p>
              <p className="font-light">{category}</p>
            </div>
          )}
          {price !== undefined && price !== null && (
            <div className="flex justify-between text-[0.9rem]">
              <p className="font-light">Price:</p>
              <p className="font-light">{formatRupiah(price)}</p>
            </div>
          )}
          <div className="mt-4">
            <Button onClick={onClick} className="w-full text-lg">
              Review
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

interface ItemProps {
  name: string;
  image: string;
  category?: string;
  price?: number;
  isLoading?: boolean;
}
