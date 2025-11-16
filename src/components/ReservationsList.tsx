import ReservationCard from "@/components/ReservationCard";
import { getSession } from "@/helpers/getSession";
import { getBookings } from "@/lib/apiService";
import Link from "next/link";

export default async function ReservationsList() {
  const session = await getSession();
  const { data } = await getBookings(session?.user?.id as string);

  return (
    <>
      {!data?.length ? (
        <p className="text-lg">
          You have on reservations yet. Check out our{" "}
          <Link href="/cabins" className="text-accent-500 underline">
            luxury cabins →
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {data?.map((booking) => (
            <ReservationCard key={booking._id?.toString()} booking={booking} />
          ))}
        </ul>
      )}
    </>
  );
}
