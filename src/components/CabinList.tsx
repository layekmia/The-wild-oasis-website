import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "@/lib/apiService";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }: { filter: string }) {
  noStore();
  const { data } = await getCabins();
  if (!data?.length) return null;

  const displayedCabins = data.filter((cabin) => {
    switch (filter) {
      case "small":
        return cabin.maxCapacity <= 3;
      case "medium":
        return cabin.maxCapacity <= 10;
      case "large":
        return cabin.maxCapacity > 10;
      default:
        return true;
    }
  });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard key={cabin._id?.toString()} cabin={cabin} />
      ))}
    </div>
  );
}
