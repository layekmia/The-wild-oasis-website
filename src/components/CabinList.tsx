"use client";

import { getCabins } from "@/lib/apiService";
import CabinCard from "./CabinCard";
import { useEffect, useState } from "react";
import { ICabin } from "@/types/models";

export default function CabinList() {
  const [data, setData] = useState<ICabin[]>([]);

  useEffect(() => {
    async function getData() {
      const { data } = await getCabins();
      setData(data);
    }
    getData();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {data.map((cabin) => (
        <CabinCard key={cabin._id?.toString()} cabin={cabin} />
      ))}
    </div>
  );
}
