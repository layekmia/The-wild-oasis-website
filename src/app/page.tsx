import { getCabin } from "@/helpers/apiService";

export default async function Page() {
  const cabin = await getCabin("690c037ce10286f50a18ef47");
  console.log(cabin);

  return <div>Home</div>;
}
