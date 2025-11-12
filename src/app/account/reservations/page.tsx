import ReservationsList from "@/components/ReservationsList";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  return (
    <div className="p-1">
      <h2 className="text-accent-400 font-semibold text-2xl mb-7">
        Your reservations
      </h2>
      <Suspense fallback={<Spinner />}>
        <ReservationsList />
      </Suspense>
    </div>
  );
}
