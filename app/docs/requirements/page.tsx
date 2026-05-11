"use client";

import { Monitor, FileCheck, ShieldCheck, WifiOff, ArrowRight, Globe } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function RequirementsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Monitor size={ 14 } />
                    Подготовка
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Что нужно для
                    { " " }
                    <span className="text-primary">работы</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    SheetHarvest работает прямо в вашем браузере. Вам не нужно ничего скачивать или устанавливать на компьютер.
                </p>
            </header>

            <Divider />

            { /* Форматы файлов */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <FileCheck className="text-primary" size={ 20 } />
                    1. Поддерживаемые файлы
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Приложение понимает все основные форматы таблиц, которые используются в офисах:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormatCard desc="Стандартный формат современного Excel" title=".XLSX" />
                    <FormatCard desc="Старый формат Excel (97-2003)" title=".XLS" />
                    <FormatCard desc="Текстовые таблицы из других программ" title=".CSV" />
                </div>
            </section>

            { /* Безопасность */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <ShieldCheck className="text-primary" size={ 20 } />
                    2. Безопасность и Интернет
                </h2>

                <Card className="bg-primary-50 border-none shadow-none" radius="lg">
                    <CardBody className="p-6 flex flex-row gap-5 items-start">
                        <div className="p-3 bg-white rounded-2xl text-primary shadow-sm shrink-0">
                            <WifiOff size={ 24 } />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-black text-primary uppercase">Ваши данные не покидают компьютер</h4>

                            <p className="text-xs text-slate-600 leading-relaxed">
                                Это самая важная часть: когда вы загружаете файл, он
                                { " " }
                                <b>не отправляется в интернет</b>
                                .
                                Все расчеты происходят внутри вашего браузера. Если вы отключите интернет после загрузки страницы,
                                программа продолжит работать так же быстро.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            { /* Браузеры */ }

            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Globe className="text-primary" size={ 20 } />
                    3. Какой браузер выбрать?
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Для быстрой работы мы рекомендуем использовать последние версии современных браузеров:
                </p>

                <div className="flex flex-wrap gap-8 py-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
                        Google Chrome
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
                        Yandex Browser
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
                        Microsoft Edge
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900">
                        Safari
                    </div>
                </div>
            </section>

            { /* Память */ }

            <section className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Маленький совет:</h3>

                <p className="text-xs text-slate-500 leading-relaxed italic">
                    Если ваш файл очень большой (десятки тысяч строк), программе потребуется больше оперативной памяти.
                    В этом случае лучше закрыть лишние вкладки в браузере.
                </p>
            </section>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/concepts"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/quick-start/upload"
                    variant="flat"
                >
                    Раздел: Быстрый старт
                </Button>
            </div>
        </div>
    );
}

const FormatCard = ({ title, desc }: { title: string, desc: string }) => (
    <Card className="border border-slate-100 shadow-none bg-white p-2" radius="sm">
        <CardBody className="text-center space-y-1">
            <div className="text-lg font-black text-primary">{ title }</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase leading-tight">{ desc }</div>
        </CardBody>
    </Card>
);
