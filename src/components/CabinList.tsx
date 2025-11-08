import { getCabins } from "@/lib/apiService";
import CabinCard from "./CabinCard";
import { ICabin } from "@/types/models";

export default async function CabinList() {
  // const { data } = await getCabins();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cabins`);
  const cabins: ICabin[] = await res.json();
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard key={cabin._id?.toString()} cabin={cabin} />
      ))}
    </div>
  );
}
