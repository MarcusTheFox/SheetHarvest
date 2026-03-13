"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { X, LayoutGrid, Rows } from "lucide-react";
import { memo } from "react";

interface ResultsTableTopBarProps {
  tablesCount: number;
  totalRowsCount: number;
  onClear: () => void;
}

export const ResultsTableTopBar = memo(({ tablesCount, totalRowsCount, onClear }: ResultsTableTopBarProps) => {
  return (
    <Card className="mb-8 shadow-md border border-default-100 sticky top-12 z-30">
      <CardBody className="flex flex-row items-center justify-between p-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-default-800">Результаты сбора</h2>
            <p className="text-sm text-default-500">Общий итог по документу</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100">
              <LayoutGrid size={18} className="text-primary" />
              <span className="text-sm font-bold text-primary-700">{tablesCount} таблиц</span>
            </div>
            <div className="flex items-center gap-2 bg-success-50 px-3 py-1.5 rounded-lg border border-success-100">
              <Rows size={18} className="text-success" />
              <span className="text-sm font-bold text-success-700">{totalRowsCount} строк</span>
            </div>
          </div>
        </div>

        <Button
          variant="flat"
          color="danger"
          className="font-semibold"
          onPress={onClear}
          startContent={<X size={18} />}
        >
          Закрыть результаты
        </Button>
      </CardBody>
    </Card>
  );
});

ResultsTableTopBar.displayName = "ResultsTableTopBar";