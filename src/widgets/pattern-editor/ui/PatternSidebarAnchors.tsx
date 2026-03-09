"use client";

import { usePatternStore } from "@/entities/pattern/model/store";
import { Chip } from "@heroui/react";
import { Anchor, Flag, XCircle } from "lucide-react";
import { memo } from "react";

export const PatternSidebarAnchors = memo(() => {
  const { anchor, setStartAnchor, setEndAnchor } = usePatternStore();

  return (
    <div className="flex flex-col gap-2 p-3 bg-primary-50/50 rounded-2xl border border-primary-100">
      <span className="text-[10px] font-black text-primary-600 uppercase flex items-center gap-1 mb-1">
        <Anchor size={12} /> Область поиска (Якоря)
      </span>
      <div className="flex flex-col gap-2">
        <Chip 
          onClose={anchor.start ? () => setStartAnchor(null) : undefined} 
          variant="flat" 
          color={anchor.start ? "success" : "default"}
          size="sm"
          className="max-w-full"
          startContent={<Flag size={14} />}
        >
          {anchor.start ? `От: ${anchor.start.text}` : "Начало: не задано"}
        </Chip>
        <Chip 
          onClose={anchor.end ? () => setEndAnchor(null) : undefined} 
          variant="flat" 
          color={anchor.end ? "danger" : "default"}
          size="sm"
          className="max-w-full"
          startContent={<XCircle size={14} />}
        >
          {anchor.end ? `До: ${anchor.end.text}` : "Конец: не задано"}
        </Chip>
      </div>
    </div>
  );
});

PatternSidebarAnchors.displayName = "PatternSidebarAnchors";
