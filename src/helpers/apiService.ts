import { IBooking, ICabin, IGuest, settings } from "@/types/models";
import axios from "axios";

// base url for API requests
const baseUrl = "http://localhost:3000";

//* Fetch all cabins
export async function getCabins(): Promise<{
  data: any[];
  error: string | null;
}> {
  try {
    const res = await axios.get(`${baseUrl}/api/cabins`);

    // If API returns error or empty, handle it
    if (!res.data || res.data.error) {
      return { data: [], error: res.data?.error || "No cabins found" };
    }

    return { data: Array.isArray(res.data) ? res.data : [], error: null };
  } catch (err: any) {
    console.error("Network/server error fetching cabins:", err.message || err);
    return { data: [], error: err.message || "Failed to fetch cabins" };
  }
}

//* Fetch cabin price interface
interface CabinPrice {
  regularPrice: number;
  discount: number;
}

//* Fetch cabin price details */
export async function getCabinPrice(
  id: string
): Promise<{ data: CabinPrice; error: string | null }> {
  if (!id) {
    return {
      data: { regularPrice: 0, discount: 0 },
      error: "Cabin ID is required",
    };
  }

  try {
    const res = await axios.get(`${baseUrl}/api/cabins?id=${id}&type=price`);

    if (!res.data) {
      return {
        data: { regularPrice: 0, discount: 0 },
        error: "No price data returned",
      };
    }

    return {
      data: {
        regularPrice: res.data.regularPrice ?? 0,
        discount: res.data.discount ?? 0,
      },
      error: null,
    };
  } catch (err: any) {
    console.error(
      "Network/server error fetching cabin price:",
      err.message || err
    );
    return {
      data: { regularPrice: 0, discount: 0 },
      error: err.message || "Failed to fetch cabin price",
    };
  }
}

//* Fetch single cabin by ID
export async function getCabin(
  id: string
): Promise<{ data: ICabin | null; error: string | null }> {
  if (!id) {
    return { data: null, error: "Cabin ID is required" };
  }

  try {
    const res = await axios.get(`${baseUrl}/api/cabins?id=${id}&type=single`);

    if (!res.data) {
      return { data: null, error: "No cabin data returned" };
    }

    return { data: res.data as ICabin, error: null };
  } catch (err: any) {
    console.error("Network/server error fetching cabin:", err.message || err);
    return { data: null, error: err.message || "Failed to fetch cabin" };
  }
}

//* Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//* Fetch guest by email
export async function getGuestByEmail(
  email: string
): Promise<{ data: IGuest | null; error: string | null }> {
  if (!email) {
    return { data: null, error: "Valid email is required" };
  } else if (!emailRegex.test(email)) {
    return { data: null, error: "Enter valid email" };
  }

  try {
    const res = await axios.get(`${baseUrl}/api/guest?email=${email}`);

    if (!res.data) {
      return { data: null, error: "No guest data returned" };
    }

    return { data: res.data as IGuest, error: null };
  } catch (err: any) {
    console.error("Network/server error fetching guest:", err.message || err);
    return { data: null, error: err.message || "Failed to fetch guest" };
  }
}

//* Create a new booking
export async function createBooking(newBooking: Partial<IBooking>): Promise<{
  data: IBooking | null;
  error: string | null;
}> {
  try {
    const res = await axios.post(`${baseUrl}/api/bookings`, newBooking);

    if (!res.data || res.data.error)
      return {
        data: null,
        error: res.data?.error || "Failed to create booking",
      };

    return { data: res.data as IBooking, error: null };
  } catch (err: any) {
    console.error("Network/server error creating booking:", err.message || err);
    return { data: null, error: err.message || "Failed to create booking" };
  }
}


//* Fetch single booking by ID
export async function getBooking(
  id: string
): Promise<{ data: IBooking | null; error: string | null }> {
  if (!id) return { data: null, error: "Booking Id is required" };

  try {
    const res = await axios.get(`${baseUrl}/api/bookings?type=single&id=${id}`);
    if (!res.data || res.data.error)
      return {
        data: null,
        error: res.data?.error || "Failed to fetch booking",
      };
    return { data: res.data as IBooking, error: null };
  } catch (err: any) {
    console.error("Network/server error fetching booking:", err.message || err);
    return { data: null, error: err.message || "Failed to fetch booking" };
  }
}

//* Fetch all bookings for a guest
export async function getBookings(
  guestId: string
): Promise<{ data: IBooking[]; error: string | null }> {
  if (!guestId) return { data: [], error: "Guest ID is required" };

  try {
    const res = await axios.get(
      `${baseUrl}/api/bookings?type=list&guestId=${guestId}`
    );
    if (!res.data || res.data.error)
      return { data: [], error: res.data?.error || "No booking found" };

    return { data: res.data as IBooking[], error: null };
  } catch (err: any) {
    console.error(
      "Network/server error fetching bookings:",
      err.message || err
    );
    return { data: [], error: err.message || "Failed to fetch bookings" };
  }
}


//* Fetch booked dates for a cabin
export async function getBookedDatesByCabinId(
  cabinId: string
): Promise<{ data: string[]; error: string | null }> {
  if (!cabinId) return { data: [], error: "Cabin ID is required" };

  try {
    const res = await axios.get(
      `${baseUrl}/api/bookings?type=bookedDates&cabinId=${cabinId}`
    );

    if (!res.data || res.data.error)
      return { data: [], error: res.data?.error || "No booked dates found" };

    return { data: res.data as string[], error: null };
  } catch (err: any) {
    if (err.response?.status === 404)
      return { data: [], error: "No booked dates found" };
    console.error("Error fetching booked dates:", err.message || err);
    return { data: [], error: err.message || "Failed to fetch booked dates" };
  }
}

//* Update booking by ID
export async function updateBooking(
  bookingId: string,
  updateData: Partial<IBooking>
): Promise<{ data: IBooking | null; error: string | null }> {
  if (!bookingId) return { data: null, error: "Booking ID is required" };

  try {
    const res = await axios.put(
      `${baseUrl}/api/bookings/${bookingId}`,
      updateData
    );

    if (!res.data || res.data.error)
      return {
        data: null,
        error: res.data?.error || "Failed to update booking",
      };

    return { data: res.data as IBooking, error: null };
  } catch (err: any) {
    console.error("Network/server error updating booking:", err.message || err);
    return { data: null, error: err.message || "Failed to update booking" };
  }
}


//* Fetch application settings
export async function getSettings(): Promise<{
  data: settings | null;
  error: string | null;
}> {
  try {
    const res = await axios.get(`${baseUrl}/api/settings`);
    if (!res.data || res.data.error)
      return {
        data: null,
        error: res.data?.error || "Failed to fetch settings",
      };

    return { data: res.data as settings, error: null };
  } catch (err: any) {
    console.error(
      "Network/server error fetching settings:",
      err.message || err
    );
    return { data: null, error: err.message || "Failed to fetch settings" };
  }
}
