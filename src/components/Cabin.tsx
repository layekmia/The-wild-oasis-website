import { ICabin } from "@/types/models";

interface cabinProps {
  cabin: ICabin;
}

export default function Cabin({ cabin }: cabinProps) {
  return <div>Cabin</div>;
}
