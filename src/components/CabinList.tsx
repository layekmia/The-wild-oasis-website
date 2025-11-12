import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "@/lib/apiService";
import CabinCard from "./CabinCard";

export default async function CabinList() {
  noStore();
  const { data } = await getCabins();

  if (!data?.length) return null;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {data?.map((cabin) => (
        <CabinCard key={cabin._id?.toString()} cabin={cabin} />
      ))}
    </div>
  );
}
