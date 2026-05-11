"use client";

import { Grid2X2, Lock, ArrowRight, HelpCircle, Table, Layers, Info, FileStack } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function MatrixLayerPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Grid2X2 size={ 14 } />
                    Библиотека функций
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Разделение
                    { " " }
                    <span className="text-primary">Матрицы</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Этот инструмент превращает одну большую таблицу в
                    { " " }
                    <b>целую стопку отдельных таблиц</b>
                    .
                    Это идеальный способ разделить общий прайс-лист на отдельные списки по складам, городам или категориям.
                </p>
            </header>

            <Divider />

            { /* Суть процесса */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Как это работает?</h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Представьте, что у вас есть файл, где в одной строке указан товар, а дальше идут колонки:
                    { " " }
                    <b>«Остаток Москва»</b>
                    ,
                    <b>«Остаток Питер»</b>
                    { " " }
                    и
                    <b>«Остаток Казань»</b>
                    .
                    <br />
                    <br />
                    Инструмент «Матрица» возьмет этот файл и создаст из него
                    { " " }
                    <b>три разные таблицы</b>
                    .
                    Названия колонок (Москва, Питер, Казань) станут
                    { " " }
                    <b>названиями этих таблиц</b>
                    .
                </p>

                { /* Визуальная схема */ }

                <Card className="border-none shadow-xl bg-slate-900" radius="lg">
                    <CardBody className="p-6">
                        <div className="flex flex-col md:flex-row items-center gap-8 justify-center text-white">
                            <div className="text-center space-y-2">
                                <div className="text-[10px] font-black uppercase text-slate-400">Вход (1 широкая таблица)</div>

                                <div className="p-3 bg-white/10 rounded border border-white/10 text-[10px] font-mono">
                                    Товар А |
                                    { " " }
                                    <b>Мск: 10</b>
                                    { " " }
                                    |
                                    { " " }
                                    <b>Спб: 5</b>
                                </div>
                            </div>

                            <ArrowRight className="text-primary hidden md:block" />

                            <div className="text-center space-y-2">
                                <div className="text-[10px] font-black uppercase text-primary">Выход (2 отдельные таблицы)</div>

                                <div className="flex gap-3">
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-bold text-success uppercase">Таблица «Мск»</div>
                                        <div className="p-2 bg-success/20 rounded border border-success/30 text-[9px] font-mono">Товар А | 10</div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-[9px] font-bold text-success uppercase">Таблица «Спб»</div>
                                        <div className="p-2 bg-success/20 rounded border border-success/30 text-[9px] font-mono">Товар А | 5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </section>

            { /* Настройка ролей */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Настройка ролей</h2>

                <div className="space-y-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                <Lock size={ 16 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Постоянные колонки</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Выберите колонки, которые должны быть в
                                    { " " }
                                    <b>каждой</b>
                                    { " " }
                                    из новых таблиц (например: Артикул и Название товара).
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded bg-success text-white flex items-center justify-center shrink-0 shadow-lg shadow-success/20">
                                <Grid2X2 size={ 16 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Колонки сетки</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Выберите колонки, названия которых станут
                                    { " " }
                                    <b>именами новых таблиц</b>
                                    .
                                    Данные из этих колонок попадут в новый столбец «Количество».
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            { /* Важный нюанс */ }

            <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-primary shrink-0">
                        <FileStack size={ 24 } />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">Итог: много таблиц</h4>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            После применения этого слоя на экране результатов вы увидите не одну таблицу, а целый список.
                            Каждую из них можно просмотреть отдельно, а при экспорте в Excel они превратятся в
                            { " " }
                            <b>отдельные листы</b>
                            { " " }
                            одного файла.
                        </p>
                    </div>
                </CardBody>
            </Card>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/layers/transform"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/features/mapping"
                    variant="flat"
                >
                    Дальше: Глобальное сопоставление
                </Button>
            </div>
        </div>
    );
}
