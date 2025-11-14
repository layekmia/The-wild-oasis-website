"use client";

import { useReservation } from "@/context/reservation";
import { ICabin } from "@/types/models";

interface Cabin {
  cabin: ICabin;
}

export default function ReservationForm({ cabin }: Cabin) {
  const { range } = useReservation();
  const { maxCapacity } = cabin;

  return (
    <div className="h-full bg-primary-900">
      <div className="flex items-center gap-5 px-16 py-2 bg-primary-800">
        <p>Logged in as</p>
        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <form className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg">
        <div className="space-y-2">
          <label htmlFor="numOfGuest">How many Guests</label>
          <select
            name="numOfGuest"
            required
            id="numOfGuest"
            className="w-full py-3 px-5 bg-primary-200 text-primary-800 rounded-md shadow-xl"
          >
            <option value='' disabled selected>Select number of guests..</option>
            {Array.from({ length: maxCapacity }, (_, num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
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
            id="observations"
            className="py-3 px-5 bg-primary-200 rounded-md w-full text-primary-800"
            placeholder=" Any pets, allergies, special requirements, etc,"
          ></textarea>
        </div>
        <div className="flex items-center gap-5 justify-end">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
          {range?.from && range?.to && (
            <button className="py-4 px-8 cursor-pointer bg-accent-500 hover:bg-accent-600 text-primary-800 font-semibold">
              Reserve now
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
