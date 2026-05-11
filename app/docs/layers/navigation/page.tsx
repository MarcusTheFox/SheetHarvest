"use client";

import { Anchor, ArrowDownToLine, Info, HelpCircle, ArrowRight, Target, Scissors } from "lucide-react";
import { Divider, Button, Card, CardBody, Chip } from "@heroui/react";
import Link from "next/link";

export default function NavigationLayersPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Target size={ 14 } />
                    Библиотека функций
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Навигация и
                    { " " }
                    <span className="text-primary">Поиск</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Часто нужная таблица «спрятана» внутри листа Excel среди лишних заголовков, контактов компании или пустых строк.
                    Инструменты навигации помогают прицелиться и забрать только полезную область.
                </p>
            </header>

            <Divider />

            { /* 1. Якоря (Anchor Layer) */ }

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Anchor size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Якоря: Ограничение области</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Этот инструмент работает как
                    { " " }
                    <b>ножницы</b>
                    . Вы указываете программе: «Начни собирать данные, когда встретишь текст Х, и закончи, когда увидишь текст Y».
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-3">
                            <h4 className="text-xs font-black text-primary uppercase">Начало диапазона</h4>

                            <p className="text-[11px] text-slate-500 leading-normal">
                                Выберите колонку и напишите текст-маркер (например, «Артикул» или «Наименование»).
                                Программа пропустит всё, что находится выше этого слова.
                            </p>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-3">
                            <h4 className="text-xs font-black text-primary uppercase">Конец диапазона</h4>

                            <p className="text-[11px] text-slate-500 leading-normal">
                                Текст, после которого данные брать не нужно (например, «Итого» или «Подпись»).
                                Всё, что ниже этого маркера, будет отрезано.
                            </p>
                        </CardBody>
                    </Card>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-blue-700">
                        <Scissors size={ 16 } />
                        <span className="text-xs font-bold uppercase">Полезные опции:</span>
                    </div>

                    <ul className="list-none space-y-1">
                        <li className="text-[11px] text-blue-600 italic">
                            <b>• Включить маркер:</b>
                            { " " }
                            Если галочка стоит, строка с самим словом-якорем тоже попадет в результат.
                        </li>

                        <li className="text-[11px] text-blue-600 italic">
                            <b>• Склеить результаты:</b>
                            { " " }
                            Если в файле несколько таблиц, этот переключатель соберет их в один список.
                        </li>
                    </ul>
                </div>
            </section>

            { /* 2. Пропуск строк (Row Skip) */ }

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <ArrowDownToLine size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Пропуск строк</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Самый простой инструмент. Он просто удаляет указанное количество строк сверху.
                </p>

                <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-2 flex-1">
                        <h4 className="text-sm font-bold text-slate-800 uppercase">Когда использовать:</h4>

                        <p className="text-xs text-slate-500 leading-relaxed">
                            Если вы точно знаете, что первые 3 строки в каждом вашем файле — это реклама или ненужные заголовки,
                            просто введите число
                            { " " }
                            <b>3</b>
                            { " " }
                            в настройках. Программа будет «откусывать» их автоматически.
                        </p>
                    </div>

                    <div className="w-full md:w-48 p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Пропустить строк</div>
                        <div className="text-3xl font-black text-primary tracking-tighter">3</div>
                    </div>
                </div>
            </section>

            { /* Рекомендация */ }

            <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-primary shrink-0">
                        <HelpCircle size={ 24 } />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">Что выбрать?</h4>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            Если положение таблицы в файле всегда меняется — используйте
                            { " " }
                            <b>«Якоря»</b>
                            { " " }
                            (они ищут текст).
                            Если таблица всегда начинается с одной и той же строки — используйте
                            { " " }
                            <b>«Пропуск строк»</b>
                            { " " }
                            (это быстрее).
                        </p>
                    </div>
                </CardBody>
            </Card>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/ui/settings"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/layers/filters"
                    variant="flat"
                >
                    Дальше: Фильтрация данных
                </Button>
            </div>
        </div>
    );
}
