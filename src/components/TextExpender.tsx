"use client";

import { useState } from "react";

export default function TextExpender({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1 cursor-pointer"
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </span>
  );
}
