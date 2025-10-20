"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
 const searchParams =   useSearchParams();
 const router = useRouter();
 const pathName  = usePathname();

 const activeFilter = searchParams.get("capacity") ?? 'all'; 

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        onClick={() => handleFilter("all")}
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === 'all' ? 'bg-primary-700' : ''}`}
      >
        All Cabins
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === 'small' ? 'bg-primary-700' : ''}`}
      >
        1&mdash;3 guests
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === 'medium' ? 'bg-primary-700' : ''}`}
      >
        1&mdash;7 guests
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === 'large' ? 'bg-primary-700' : ''}`}
      >
        1&mdash;12 guests
      </button>
    </div>
  );
}
