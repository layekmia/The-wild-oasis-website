import ReservationCard from "@/components/ReservationCard";
import { getBookings } from "@/lib/apiService";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const { data } = await getBookings("690c037ce10286f50a18ef40");

  return (
    <div className="p-1">
      <h2 className="text-accent-400 font-semibold text-2xl mb-7">
        Your reservations
      </h2>
      {data.length === 0 ? (
        <p className="text-lg">
          You have on reservations yet. Check out our{" "}
          <Link href="/cabins" className="text-accent-500 underline">
            luxury cabins →
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {data.map((booking) => (
            <ReservationCard key={booking._id?.toString()} booking={booking} />
          ))}
        </ul>
      )}
    </div>
  );
}
