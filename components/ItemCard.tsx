import { formatRupiah } from "@/helper/idrConvert";
import { Card } from "./tremor/Card";
import Image from "next/image";
import { Button } from "./tremor/Button";

export const ItemCard = ({
  name,
  image,
  //   seller,
  category,
  price,
  onClick,
}: ItemProps & { className?: string; onClick?: () => void }) => {
  return (
    <Card>
      <div className="mb-4">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          unoptimized
          className="rounded-lg"
        />
      </div>
      <p className="mb-2 font-semibold">{name}</p>
      {/* <div className="flex justify-between text-[0.9rem]">
        <p className="font-light">Seller:</p>
        <p className="font-light">{seller}</p>
      </div> */}
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
    </Card>
  );
};

interface ItemProps {
  name: string;
  image: string;
  //   seller?: string;
  category?: string;
  price?: number;
}
