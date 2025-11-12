import ReservationCard from "@/components/ReservationCard";
import { getBookings } from "@/lib/apiService";
import Link from "next/link";

export default async function ReservationsList() {
  const { data } = await getBookings("690c037ce10286f50a18ef40");

  if (!data?.length)
    return (
      <p className="text-lg">
        You have on reservations yet. Check out our{" "}
        <Link href="/cabins" className="text-accent-500 underline">
          luxury cabins →
        </Link>
      </p>
    );
  return (
    <ul className="space-y-6">
      {data?.map((booking) => (
        <ReservationCard key={booking._id?.toString()} booking={booking} />
      ))}
    </ul>
  );
}
