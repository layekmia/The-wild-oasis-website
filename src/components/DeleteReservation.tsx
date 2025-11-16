"use client";

import { deleteReservation } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/16/solid";

export default function DeleteReservation({
  bookingId,
}: {
  bookingId: string;
}) {
  return (
    <button
      onClick={() => deleteReservation(bookingId)}
      className="group flex cursor-pointer items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">Delete</span>
    </button>
  );
}
