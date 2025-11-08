import { ICabin } from "@/types/models";
import Image from "next/image";

interface cabinProps {
  cabin: ICabin;
}

export default function Cabin({ cabin }: cabinProps) {
  return (
    <div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border border-primary-700 py-3 px-10">
      <div className="relative ">
        <Image
          src={cabin.image}
          alt={cabin.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <h1></h1>
      </div>
    </div>
  );
}
