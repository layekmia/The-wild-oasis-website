import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import { getCabin } from "@/lib/apiService";

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const { data } = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={data} />
      <h2
        className="text-5xl font-semibold text-center mb-10
       text-accent-400"
      >
        Reserve {data?.name} today. Pay on arrival.
      </h2>
      <Reservation />
    </div>
  );
}
