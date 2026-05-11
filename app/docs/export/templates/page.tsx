"use client";

import { Save, FolderOpen, Zap, Trash2, Clock, ArrowRight, Copy } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function TemplatesPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Save size={ 14 } />
                    Шаблоны и Экспорт
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Работа с
                    { " " }
                    <span className="text-primary">Шаблонами</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Шаблон — это сохраненная инструкция для программы.
                    Один раз настроив очистку файла от конкретного поставщика, вы сможете повторять её мгновенно.
                </p>
            </header>

            <Divider />

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white shadow-lg shadow-primary/20">
                        <Copy size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Как создать шаблон</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Когда вы добавили все нужные шаги (Якоря, Фильтры, Колонки) и убедились, что результат вас устраивает:
                </p>

                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">1</div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                            Найдите поле
                            { " " }
                            <b>«Название шаблона»</b>
                            { " " }
                            в левой или правой нижней части экрана.
                        </p>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">2</div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                            Введите понятное имя (например,
                            { " " }
                            <i>«Прайс Техника — Поставщик А»</i>
                            ) и нажмите на иконку
                            { " " }
                            <b>дискеты (Сохранить)</b>
                            { }
                            .
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white shadow-lg shadow-primary/20">
                        <FolderOpen size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Как применить шаблон</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    В следующий раз, когда вы загрузите похожий файл, вам не нужно добавлять шаги вручную:
                </p>

                <Card className="border-none shadow-none bg-slate-50" radius="lg">
                    <CardBody className="p-6 flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <h4 className="text-sm font-black text-slate-800 uppercase">Список шаблонов</h4>

                            <p className="text-xs text-slate-500 leading-relaxed">
                                Все ваши сохраненные инструкции находятся в блоке
                                { " " }
                                <b>«Сохраненные шаблоны»</b>
                                { }
                                .
                                Просто нажмите на название нужного шаблона, и вся цепочка действий тут же появится в списке функций.
                            </p>
                        </div>

                        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 w-full md:w-48">
                            <div className="h-2 w-3/4 bg-slate-100 rounded" />
                            <div className="h-2 w-1/2 bg-primary/20 rounded" />
                            <div className="h-2 w-2/3 bg-slate-100 rounded" />
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Управление библиотекой</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <Trash2 className="text-danger shrink-0 mt-1" size={ 18 } />

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Удаление</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Если шаблон больше не нужен, нажмите на иконку корзины рядом с его названием в списке.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <Clock className="text-primary shrink-0 mt-1" size={ 18 } />

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Дата создания</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Программа запоминает, когда был создан шаблон, помогая вам ориентироваться в версиях настроек.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start text-white">
                    <div className="p-3 bg-primary rounded-xl shrink-0 shadow-lg shadow-primary/40">
                        <Zap fill="currentColor" size={ 24 } />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-tight">Магия автоматизации</h4>

                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            «Идеальный рабочий процесс в SheetHarvest выглядит так:
                            { " " }
                            <br />
                            1. Загрузили новый файл.
                            { " " }
                            <br />
                            2. Кликнули на имя шаблона.
                            { " " }
                            <br />
                            3. Нажали „Запустить сбор“.
                            { " " }
                            <br />
                            Готово! Работа, которая раньше занимала 30 минут, теперь делается за 10 секунд».
                        </p>
                    </div>
                </CardBody>
            </Card>

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/features/mapping"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/export/formats"
                    variant="flat"
                >
                    Дальше: Форматы Экспорта
                </Button>
            </div>
        </div>
    );
}
