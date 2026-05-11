"use client";

import { Workflow, Layers, Table, ChevronRight, Play, ArrowRight } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function ConceptsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Workflow size={ 14 } />
                    Основные идеи
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Как это
                    { " " }
                    <span className="text-primary">работает</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Чтобы эффективно использовать SheetHarvest, достаточно понять две главные вещи:
                    что такое
                    { " " }
                    <b>Пайплайн</b>
                    { " " }
                    и как работают
                    { " " }
                    <b>Слои</b>
                    .
                </p>
            </header>

            <Divider />

            { /* Пайплайн - Конвейер */ }

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Play fill="currentColor" size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">1. Пайплайн — это ваш конвейер</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Представьте рабочую ленту на заводе. Вы кладете на неё «грязную» таблицу в начале,
                    и она едет мимо разных инструментов. Каждый инструмент делает что-то одно:
                    вырезает лишнее, исправляет ошибки или меняет названия.
                    В конце ленты вы забираете уже готовый, чистый продукт.
                </p>

                <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                    <CardBody className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-center px-4">
                                <div className="text-primary font-black text-xs uppercase mb-1">Вход</div>
                                <div className="text-white text-xs font-mono bg-white/10 p-2 rounded border border-white/10">Файл с мусором</div>
                            </div>

                            <ChevronRight className="text-slate-600 hidden md:block" />

                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-[10px] font-bold">1</div>
                                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-[10px] font-bold">2</div>
                                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-[10px] font-bold">3</div>
                            </div>

                            <ChevronRight className="text-slate-600 hidden md:block" />

                            <div className="text-center px-4">
                                <div className="text-success font-black text-xs uppercase mb-1">Выход</div>
                                <div className="text-white text-xs font-bold bg-success/20 p-2 rounded border border-success/30 italic">Чистый отчет</div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </section>

            { /* Слои - Инструменты */ }

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Layers size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">2. Слои — это шаги обработки</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Каждое действие, которое вы добавляете — это
                    { " " }
                    <b>Слой</b>
                    .
                    Они лежат друг на друге по порядку. Самое важное: вы в любой момент можете
                    вернуться к любому шагу и изменить его настройки, не переделывая всё остальное.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Пример цепочки слоев:</h4>

                        <ul className="space-y-2">
                            <LayerStep number="1" title="Найти таблицу на листе" />
                            <LayerStep number="2" title="Убрать пустые строки" />
                            <LayerStep number="3" title="Переименовать колонку «Цена_1» в «Цена»" />
                            <LayerStep number="4" title="Оставить только товары в наличии" />
                        </ul>
                    </div>

                    <Card className="border-dashed border-2 border-slate-200 bg-white shadow-none flex items-center justify-center p-6 text-center" radius="lg">
                        <div className="space-y-2">
                            <Table className="mx-auto text-primary opacity-40" size={ 40 } />
                            <h4 className="text-xs font-bold text-slate-800">Визуальный контроль</h4>

                            <p className="text-[11px] text-slate-500 leading-normal">
                                На каждом шаге вы видите две таблицы:
                                { " " }
                                <br />
                                <b>«До»</b>
                                { " " }
                                (как данные пришли на шаг)
                                <br />
                                и
                                { " " }
                                <b>«После»</b>
                                { " " }
                                (что с ними сделал этот инструмент).
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/intro"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/requirements"
                    variant="flat"
                >
                    Системные требования
                </Button>
            </div>
        </div>
    );
}

// Мини-компонент для списка слоев
const LayerStep = ({ number, title }: { number: string, title: string }) => (
    <li className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-100 group hover:border-primary/30 transition-colors">
        <span className="w-5 h-5 flex items-center justify-center rounded bg-white border border-slate-200 text-[10px] font-black text-slate-400 group-hover:text-primary">
            { number }
        </span>

        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{ title }</span>
    </li>
);
