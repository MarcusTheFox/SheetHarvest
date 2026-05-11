"use client";

import { Download, FileSpreadsheet, FileJson, FileText, Archive, Edit3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function ExportFormatsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Download size={ 14 } />
                    Шаблоны и Экспорт
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Форматы
                    { " " }
                    <span className="text-primary">Экспорта</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    После того как программа завершила сбор данных, вы попадаете на экран результатов.
                    Здесь вы можете выбрать, в каком виде забрать очищенную таблицу.
                </p>
            </header>

            <Divider />

            { /* Выбор имен */ }

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Edit3 size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Подготовка: Имена таблиц</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Перед тем как нажать кнопку «Скачать», вы можете изменить имя каждой таблицы в правой панели.
                    Это важно, так как
                    { " " }
                    <b>введенное имя станет названием файла</b>
                    { " " }
                    или названием листа в Excel.
                </p>

                <Card className="border border-slate-200 shadow-none bg-slate-50/50" radius="lg">
                    <CardBody className="p-6">
                        <div className="flex flex-col gap-4">
                            { /* Подписи над "полями" */ }

                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Имя в программе</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Ваше название для файла</span>
                            </div>

                            { /* Имитация процесса переименования */ }

                            <div className="flex items-center gap-4">
                                { /* Исходное имя (выглядит как заблокированное) */ }

                                <div className="flex-1 px-4 py-3 bg-slate-200/50 rounded-xl border border-slate-200 text-xs font-bold text-slate-400 italic flex items-center gap-2">
                                    Результат_1
                                </div>

                                { /* Стрелка перехода */ }

                                <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                    <ArrowRight className="text-primary" size={ 20 } strokeWidth={ 3 } />
                                </div>

                                { /* Активное поле ввода */ }

                                <div className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-primary shadow-md text-xs font-bold text-slate-800 flex items-center gap-3 animate-pulse-slow">
                                    <Edit3 className="text-primary" size={ 14 } />
                                    Остатки_Москва_Финальный
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <p className="text-xs text-slate-700 italic">
                    Совет: используйте понятные имена, чтобы через неделю не гадать, что лежит внутри файла.
                </p>
            </section>

            { /* Три формата */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Доступные форматы</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    { /* Excel */ }

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-200">
                                <FileSpreadsheet size={ 20 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-800 uppercase">Excel (.xlsx)</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Лучший выбор для людей. Сохраняет структуру, поддерживает длинные названия и открывается в любой офисной программе.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    { /* CSV */ }

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-700 text-white flex items-center justify-center shadow-lg shadow-slate-300">
                                <FileText size={ 20 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-800 uppercase">CSV</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Для загрузки в другие системы (1С, сайты, базы данных). Легкий и простой формат без лишнего оформления.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    { /* JSON */ }

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
                                <FileJson size={ 20 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-800 uppercase">JSON</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Формат для программистов и интеграций. Передает данные в виде структурированного кода.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </section>

            { /* Экспортировать всё */ }

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg text-white">
                        <Archive size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Экспортировать всё</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Если в результате вашей работы получилось много таблиц (например, после разделения Матрицы),
                    вам не обязательно скачивать каждую по отдельности.
                </p>

                <Card className="bg-primary border-none shadow-xl" radius="lg">
                    <CardBody className="p-6 flex flex-row gap-5 items-center text-white">
                        <div className="p-3 bg-white/20 rounded-xl shrink-0">
                            <FileSpreadsheet size={ 24 } />
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-sm font-black uppercase tracking-tight">Один файл — много листов</h4>

                            <p className="text-xs text-primary-50 leading-relaxed">
                                Кнопка
                                { " " }
                                <b>«Экспортировать всё (XLSX)»</b>
                                { " " }
                                соберет все ваши таблицы в один Excel-файл.
                                Каждая таблица аккуратно расположится на своем отдельном листе.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/export/templates"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/tips/optimization"
                    variant="flat"
                >
                    Следующий раздел: Советы
                </Button>
            </div>
        </div>
    );
}
