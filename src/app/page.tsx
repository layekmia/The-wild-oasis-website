import { getBookedDatesByCabinId, getBooking, getBookings, getCabin, getGuestByEmail } from "@/helpers/apiService";

export default async function Page() {
  const guest = await getBookedDatesByCabinId("690c037ce10286f50a18ef45");
  console.log(guest.data) 

  return <div>Home</div>;
}
