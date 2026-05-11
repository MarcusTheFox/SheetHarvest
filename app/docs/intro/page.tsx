"use client";

import { Info, ShieldCheck, Cpu, Layers, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Card, CardBody, Divider, Button } from "@heroui/react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Header */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Info size={ 14 } />
                    Введение
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    О приложении
                    { " " }
                    <span className="text-primary">SheetHarvest</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    SheetHarvest — это специализированная среда для глубокой очистки и нормализации табличных данных (XLSX, XLS, CSV).
                    Инструмент создан для тех, кто ежедневно сталкивается с «грязными» прайс-листами поставщиков, сложными выгрузками из ERP-систем и неструктурированными отчетами.
                </p>
            </header>

            <Divider />

            { /* Main Philosophy */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Зачем это нужно?</h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Обычно подготовка данных занимает 80% времени аналитика. SheetHarvest меняет этот баланс, позволяя один раз настроить «Пайплайн» (цепочку преобразований) и применять его ко всем последующим файлам аналогичного формата.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                                <Cpu size={ 20 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Client-Side Обработка</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Ваши данные не отправляются на сервер. Парсинг, фильтрация и трансформация происходят прямо в оперативной памяти вашего браузера.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                                <Layers size={ 20 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Принцип Наслоения</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Каждое действие — это «слой». Вы можете в любой момент изменить настройки в середине цепочки, и система мгновенно пересчитает финальный результат.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            { /* Workflow Section */ }

            <section className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight text-center">Как работает процесс?</h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Step icon={ <FileSpreadsheet size={ 18 } /> } label="Загрузка" />
                    <ArrowDivider />
                    <Step icon={ <Layers size={ 18 } /> } label="Настройка Слоев" />
                    <ArrowDivider />
                    <Step icon={ <ShieldCheck size={ 18 } /> } label="Валидация" />
                    <ArrowDivider />
                    <Step icon={ <ArrowRight size={ 18 } /> } label="Экспорт" />
                </div>
            </section>

            { /* Key Benefits */ }

            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Ключевые преимущества</h2>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 list-none p-0">
                    { [
                        "Никаких макросов VBA или скриптов на Python",
                        "Визуальный контроль данных на каждом этапе",
                        "Поддержка сложных объединений (Merges) в Excel",
                        "Система глобальных словарей для нормализации брендов/категорий",
                        "Мгновенный экспорт в XLSX, CSV и JSON",
                        "Сохранение настроек в виде многоразовых шаблонов",
                    ].map(( benefit, i ) => (
                        <li key={ i } className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            { benefit }
                        </li>
                    )) }
                </ul>
            </section>

            { /* Footer Nav */ }

            <div className="pt-10 flex justify-end">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/concepts"
                    variant="flat"
                >
                    Следующий раздел: Основные концепции
                </Button>
            </div>
        </div>
    );
}

// Вспомогательные компоненты для визуализации процесса
const Step = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-primary">
            { icon }
        </div>

        <span className="text-[10px] font-black uppercase tracking-tight text-slate-600">{ label }</span>
    </div>
);

const ArrowDivider = () => (
    <div className="hidden md:block text-slate-300">
        <ArrowRight size={ 20 } />
    </div>
);
