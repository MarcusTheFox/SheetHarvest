"use client";

import { Button } from "@heroui/react";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { parseSpreadsheet } from "@/shared/lib/file-parser";
import { useSpreadsheetStore } from "@/entities/spreadsheet/model/store";

export const UploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setSheets = useSpreadsheetStore((state) => state.setSheets);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const parsedData = await parseSpreadsheet(file);
      setSheets(parsedData);
    }
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".xlsx, .xls, .csv" 
        onChange={handleFileChange}
      />
      <Button 
        color="primary" 
        variant="flat" 
        startContent={<Upload size={18} />}
        onPress={() => fileInputRef.current?.click()}
        className="shrink-0"
      >
        Загрузить таблицу
      </Button>
    </>
  );
};