import { SubmitButton } from "@/components/SubmitButton";
import { updateReservation } from "@/lib/actions";
import { getBooking, getCabin } from "@/lib/apiService";

export default async function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  // CHANGE
  const { bookingId } = await params;
  const {
    data: { cabinId, numGuests, observations },
  } = await getBooking(bookingId);

  const {
    data: { maxCapacity },
  } = await getCabin(cabinId);

  const handleUpdateReservation = async (formData: FormData) => {
    "use server";
    await updateReservation(formData, bookingId);
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={handleUpdateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
