"use client";

import { Button } from "@heroui/react";
import { Settings2, Trash2 } from "lucide-react";
import { usePatternStore } from "@/entities/pattern/model/store";
import { memo } from "react";

export const PatternSidebarHeader = memo(() => {
  const resetPattern = usePatternStore(s => s.resetPattern);

  return (
    <div className="flex justify-between items-center">
      <h3 className="flex items-center gap-2 font-bold text-lg text-default-800">
        <Settings2 size={20} className="text-primary" /> Паттерн
      </h3>
      <Button isIconOnly variant="light" color="danger" size="sm" onPress={resetPattern}>
        <Trash2 size={18} />
      </Button>
    </div>
  );
});

PatternSidebarHeader.displayName = "PatternSidebarHeader";
