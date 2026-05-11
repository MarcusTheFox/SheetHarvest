"use client";

import { Filter, ShieldCheck, Check, X, Minus, Info, ArrowRight, Ban, ListFilter } from "lucide-react";
import { Divider, Button, Card, CardBody, Tooltip } from "@heroui/react";
import Link from "next/link";

export default function FiltersLayersPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Заголовок */}
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Filter size={14} />
                    Библиотека функций
                </div>
                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Фильтрация и <span className="text-primary">Очистка</span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                    После того как вы нашли нужную область в файле, её нужно очистить от «мусорных» строк: 
                    пустых промежутков, подписей или строк, где вместо цены указан текст.
                </p>
            </header>

            <Divider />

            {/* 1. Топология строк (Topology) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <ListFilter size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Топология: Правила заполнения</h2>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                    Этот инструмент проверяет «скелет» строки. Вы указываете программе, какие колонки <b>обязательно</b> должны быть заполнены, а какие — <b>обязательно</b> пустыми. 
                </p>

                <Card className="border border-slate-200 shadow-none bg-slate-50/50" radius="lg">
                    <CardBody className="p-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Три режима для каждой колонки:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-slate-600"><Minus size={14} /></div>
                                <div className="text-[11px] font-bold text-slate-600 uppercase">Любое (игнорировать)</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-success text-white flex items-center justify-center shadow-md shadow-success/20"><Check size={14} strokeWidth={3} /></div>
                                <div className="text-[11px] font-bold text-slate-600 uppercase">Должна быть заполнена</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-danger text-white flex items-center justify-center shadow-md shadow-danger/20"><X size={14} strokeWidth={3} /></div>
                                <div className="text-[11px] font-bold text-slate-600 uppercase">Должна быть пустой</div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex gap-4 items-start">
                    <Info className="text-primary shrink-0" size={18} />
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                        <b>Пример:</b> Если вы поставите «Заполнено» для колонки «Артикул», программа удалит все строки, где артикул не указан (включая пустые строки между категориями товаров).
                    </p>
                </div>
            </section>

            {/* 2. Типы данных (Constraints) */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <ShieldCheck size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Типы данных: Проверка значений</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Если «Топология» смотрит только на наличие данных, то этот инструмент проверяет <b>содержимое</b> ячеек. Он работает как строгий контролер на входе.
                </p>

                <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Популярные правила проверки:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <RuleItem title="Только Число" desc="Удалит строку, если в колонке «Цена» внезапно встретится текст «звоните» или «цена по запросу»." />
                        <RuleItem title="Не пустое" desc="Гарантирует, что важная информация (например, Название) присутствует в строке." />
                        <RuleItem title="Дата" desc="Проверит, что в ячейке указана корректная дата, а не случайный набор символов." />
                        <RuleItem title="Regex (Шаблон)" desc="Сложная проверка для тех, кто знает регулярные выражения (например, проверка формата E-mail)." />
                    </div>
                </div>
            </section>

            {/* Заметка о важности порядка */}
            <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-amber-500 shrink-0">
                        <Ban size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">Строки удаляются безвозвратно</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Помните: если строка не прошла фильтр, она исчезает из всех последующих шагов обработки. 
                            Всегда проверяйте нижнюю таблицу <b>«После»</b>, чтобы убедиться, что вы не удалили лишнего.
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Подвал навигации */}
            <div className="pt-10 flex justify-between items-center">
                <Button 
                    as={Link} 
                    href="/docs/layers/navigation" 
                    variant="light"
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                >
                    Назад
                </Button>
                <Button 
                    as={Link} 
                    href="/docs/layers/transform" 
                    color="primary" 
                    variant="flat"
                    className="font-bold uppercase text-[10px] tracking-widest"
                    endContent={<ArrowRight size={14} />}
                >
                    Дальше: Трансформация колонок
                </Button>
            </div>
        </div>
    );
}

const RuleItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm space-y-1">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">{title}</h4>
        <p className="text-[11px] text-slate-500 leading-normal">{desc}</p>
    </div>
);