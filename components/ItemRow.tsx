import { Card } from "./tremor/Card";
import Image from "next/image";
import { Button } from "./tremor/Button";

export const ItemRow = ({
  name,
  image,
  isLoading,
  onClick,
}: ItemProps & {
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Card>
      {isLoading ? (
        <div className="flex items-center justify-between px-2 animate-pulse h-[80px]">
          <div className="flex gap-4 items-center">
            <div className="bg-[#F5CEE0] rounded-lg w-[60px] h-[60px]" />
            <div className="bg-[#F5CEE0] rounded w-32 h-5" />
          </div>
          <div className="bg-[#F5CEE0] rounded w-20 h-8" />
        </div>
      ) : (
        <div className="flex items-center justify-between px-2">
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src={image || "/images/product_default.png"}
                alt={name}
                width={60}
                height={60}
                unoptimized
                className="rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/product_default.png";
                }}
              />
            </div>
            <p className="font-semibold">{name}</p>
          </div>
          <div className="mt-4">
            <Button onClick={onClick} className="w-full text-lg">
              Review
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

interface ItemProps {
  name: string;
  image: string;
}
