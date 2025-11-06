import axios from "axios";

const baseUrl = "http://localhost:3000";

export async function getCabins() {
  try {
    const res = await axios.get(`${baseUrl}/api/cabins`);
    if (!res.data || res.data.error) {
      return [];
    }
    return res.data.length ? res.data : [];
  } catch (err: any) {
    console.error(
      "Network or server error fetching cabins:",
      err.message || err
    );
    return err;
  }
}

export async function getCabinPrice(id: string) {
  if (!id) throw new Error("Cabin ID is required");

  try {
    const res = await axios.get(`${baseUrl}/api/cabins?id=${id}&type=price`);
    if (!res.data) throw new Error("No data returned from API");
    return {
      regularPrice: res.data.regularPrice ?? 0,
      discount: res.data.discount ?? 0,
    };
  } catch (err: any) {
    console.error(
      "Network or server error fetching cabin price:",
      err.message || err
    );
    throw new Error("Failed to fetch cabin price");
  }
}

export async function getCabin(id: string) {
  if (!id) throw new Error("Cabin ID is required");

  try {
    const res = await axios.get(`${baseUrl}/api/cabins?id=${id}&type=single`);
    if (!res.data) throw new Error("No data returned from API");
    return res.data; // full cabin object
  } catch (err: any) {
    console.error(
      "Network or server error fetching cabin:",
      err.message || err
    );
    throw new Error("Failed to fetch cabin");
  }
}
