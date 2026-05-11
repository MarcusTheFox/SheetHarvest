"use client";

import { Button } from "@heroui/react";
import { Play } from "lucide-react";
import { useRunExtraction } from "../lib/useRunExtraction";

export const RunExtractionButton = () => {
    const { runExtraction } = useRunExtraction();

    return (
        <Button
            className="h-8 text-[10px] font-bold uppercase tracking-widest"
            color="primary"
            radius="sm"
            startContent={ <Play fill="currentColor" size={ 12 } /> }
            onPress={ runExtraction }
        >
            Запустить сбор
        </Button>
    );
};