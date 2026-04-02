"use client";

import { memo } from "react";

interface SpreadsheetHeaderProps {
  columns: number[];
}

export const SpreadsheetHeader = memo(({ columns }: SpreadsheetHeaderProps) => {
  return (
    <thead className="sticky top-0 z-20 bg-default-100">
      <tr>
        {columns.map(i => (
          <th key={i} className="p-3 outline outline-default-200 font-mono text-[10px] text-default-400 uppercase">
            {String.fromCharCode(65 + i)}
          </th>
        ))}
      </tr>
    </thead>
  );
});

SpreadsheetHeader.displayName = "SpreadsheetHeader";
