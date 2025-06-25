import { Card } from "./tremor/Card";
import Image from "next/image";
import { Button } from "./tremor/Button";

export const ItemRow = ({
  name,
  image,
  onClick,
}: ItemProps & { className?: string; onClick?: () => void }) => {
  return (
    <Card>
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-4  items-center">
          <div className="">
            <Image
              src={image}
              alt={name}
              width={60}
              height={60}
              unoptimized
              className="rounded-lg"
            />
          </div>
          <p className=" font-semibold">{name}</p>
        </div>
        <div className="mt-4">
          <Button onClick={onClick} className="w-full text-lg">
            Review
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface ItemProps {
  name: string;
  image: string;
}
