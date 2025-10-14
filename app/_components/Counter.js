"use client";

import { useState } from "react";

export default function Counter({users}) {
  const [count, setCount] = useState(0);


  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count {count}</button>
  );
}
