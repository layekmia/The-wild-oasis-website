import { deleteBooking, getBookedDatesByCabinId, getBooking, getBookings, getCabin, getCabinPrice, getCabins, getGuestByEmail, getSettings } from "@/lib/apiService"

export default async function page() {

    const cabins = await deleteBooking("690c037ce10286f50a18ef53");

    console.log(cabins.error)

  return (
    <div>page</div>
  )
}