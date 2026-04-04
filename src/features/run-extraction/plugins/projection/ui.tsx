"use client";

import { LayerConfigProps } from "../../lib/pipeline/types";

export const ProjectionConfig = ({ prevContext }: LayerConfigProps<never>) => {
    const headers = prevContext?.headers ?? [];
    const rowCount = prevContext?.rows.length ?? 0;

    return (
        <div className="flex flex-col gap-4">
            <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-[12px] text-primary-700 leading-relaxed font-medium mb-2">
                    Что делает этот слой?
                </p>
                <p className="text-[11px] text-primary-600 leading-relaxed">
                    Слой <b>Проекция</b> оставляет только выбранные колонки паттерна и формирует итоговые заголовки.
                    Его настройки определяются выбором колонок в самом паттерне (левая панель), а не здесь.
                </p>
            </div>

            {headers.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-default-500 uppercase tracking-widest">Входные данные</span>
                    <div className="flex flex-wrap gap-2">
                        {headers.map((h, i) => (
                            <div key={i} className="bg-default-100 px-2.5 py-1 rounded-lg text-xs font-medium text-default-700">
                                {h || `Колонка ${i + 1}`}
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-default-400 mt-1">
                        Строк: {rowCount}
                    </p>
                </div>
            )}
        </div>
    );
};
