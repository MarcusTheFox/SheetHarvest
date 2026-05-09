"use client";

import { Button } from "@heroui/react";
import { Play } from "lucide-react";
import { useRunExtraction } from "../lib/useRunExtraction";

export const RunExtractionButton = () => {
    const { runExtraction } = useRunExtraction();

    return (
        <Button
            className="font-bold text-white shadow-xl py-6 rounded-2xl shrink-0"
            color="success"
            startContent={ <Play fill="currentColor" size={ 20 } /> }
            onPress={ runExtraction }
        >
            Запустить сбор данных
        </Button>
    );
};
