"use client";

import { Input, Card } from "@heroui/react";
import { RowSkipLayerSettings } from "./types";
import { LayerConfigProps } from "../../lib/pipeline/types";

type RowSkipConfigProps = LayerConfigProps<RowSkipLayerSettings>;

export const RowSkipConfig = ({ settings, onUpdate }: RowSkipConfigProps ) => {
    return (
        <div className="flex flex-col gap-6">
            <Input
                description="Первые N строк каждой группы будут исключены из результата"
                label="Количество пропускаемых строк"
                min={ 0 }
                placeholder="1"
                type="number"
                value={ String( settings.skipCount ?? 1 ) }
                onValueChange={ ( val ) => {
                    const num = parseInt( val );
                    if ( !isNaN( num ) && num >= 0 ) {
                        onUpdate?.({ skipCount: num });
                    }
                } }
            />

            <Card className="p-4 bg-default-50 shadow-none border-none">
                <p className="text-[11px] text-default-500 leading-relaxed">
                    Используйте этот слой, чтобы пропустить строку заголовка таблицы или несколько первых
                    технических строк, которые не являются данными.
                </p>
            </Card>
        </div>
    );
};
