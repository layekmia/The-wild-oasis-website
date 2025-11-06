import { getCabins } from "@/helpers/apiService";

export default async function Page() {
  const cabins = await getCabins();
  console.log(cabins);

  return <div>Home</div>;
}
