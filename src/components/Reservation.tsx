import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default function Reservation() {
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector />
      <ReservationForm />
    </div>
  );
}
