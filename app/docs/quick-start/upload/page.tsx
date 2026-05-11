"use client";

import { FileUp, MousePointerClick, LayoutPanelTop, CheckCircle2, ArrowRight } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function UploadStepPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Заголовок */}
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <FileUp size={14} />
                    Быстрый старт: Шаг 1
                </div>
                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Как загрузить <span className="text-primary">таблицу</span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                    Начать работу в SheetHarvest можно двумя простыми способами. Приложение готово к приему данных сразу после открытия.
                </p>
            </header>

            <Divider />

            {/* Способ 1: Перетаскивание */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                        1
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Просто перетащите файл</h2>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                    Возьмите файл в папке на вашем компьютере и перетащите его прямо в окно браузера. 
                    Появится синяя рамка с надписью <b>«Отпустите для загрузки»</b>. Это самый быстрый способ.
                </p>

                <Card className="bg-primary/5 border-2 border-dashed border-primary/20" shadow="none">
                    <CardBody className="p-8 flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                            <FileUp size={32} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-slate-800 uppercase">Подсказка</h4>
                            <p className="text-xs text-slate-500">Можно перетаскивать файлы даже если у вас уже открыта другая таблица.</p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            {/* Способ 2: Кнопка */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                        2
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Используйте кнопку выбора</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Если вам привычнее выбирать файл через обычное окно проводника:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex flex-row gap-4 items-center">
                            <MousePointerClick className="text-primary shrink-0" size={20} />
                            <div className="text-[11px] font-bold text-slate-600 leading-tight">
                                Нажмите на большую область в центре экрана при запуске.
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex flex-row gap-4 items-center">
                            <LayoutPanelTop className="text-primary shrink-0" size={20} />
                            <div className="text-[11px] font-bold text-slate-600 leading-tight">
                                Или используйте меню <b>«Файл» → «Открыть»</b> в верхней панели.
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            {/* Результат */}
            <section className="space-y-4 p-6 bg-success-50 rounded-2xl border border-success-100">
                <div className="flex items-center gap-2 text-success-700">
                    <CheckCircle2 size={20} />
                    <h3 className="text-sm font-black uppercase tracking-tight">Что произойдет дальше?</h3>
                </div>
                <p className="text-xs text-success-600 leading-relaxed">
                    Как только файл загрузится, экран изменится: в центре появится ваша таблица в её исходном виде, 
                    а слева — список функций. Теперь вы готовы к самому интересному — настройке обработки.
                </p>
            </section>

            {/* Подвал навигации */}
            <div className="pt-10 flex justify-between items-center">
                <Button 
                    as={Link} 
                    href="/docs/requirements" 
                    variant="light"
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                >
                    Назад
                </Button>
                <Button 
                    as={Link} 
                    href="/docs/quick-start/first-run" 
                    color="primary" 
                    variant="flat"
                    className="font-bold uppercase text-[10px] tracking-widest"
                    endContent={<ArrowRight size={14} />}
                >
                    Шаг 2: Первая выгрузка
                </Button>
            </div>
        </div>
    );
}