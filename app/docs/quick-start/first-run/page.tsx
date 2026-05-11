"use client";

import { Play, CheckCircle2, ArrowRight, Settings2 } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function FirstRunPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Play fill="currentColor" size={ 14 } />
                    Быстрый старт: Шаг 2
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Ваша первая
                    { " " }
                    <span className="text-primary">выгрузка</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Когда файл загружен, пришло время сказать программе, что именно нужно сделать с данными.
                    Весь процесс занимает три простых этапа.
                </p>
            </header>

            <Divider />

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-primary/20">
                        1
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Добавьте действия (Шаги)</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    В левой панели нажмите синюю кнопку с плюсом. Откроется список всех доступных инструментов.
                    Для начала попробуйте добавить
                    { " " }
                    <b>«Проекцию колонок»</b>
                    { " " }
                    — это самый важный шаг, где вы выбираете, какие столбцы оставить в финальном отчете.
                </p>

                <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                    <CardBody className="p-4 flex flex-row gap-4 items-center">
                        <Settings2 className="text-primary shrink-0" size={ 24 } />

                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Настройте инструмент</h4>

                            <p className="text-[11px] text-slate-500 leading-normal">
                                Как только вы выбрали шаг слева, его настройки появятся в правой панели.
                                Там можно поставить галочки на нужных колонках или написать новые заголовки.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-primary/20">
                        2
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Запустите сбор данных</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Когда все шаги добавлены и настроены, нажмите яркую синюю кнопку
                    { " " }
                    <b>«Запустить сбор»</b>
                    { " " }
                    в верхнем правом углу экрана.
                    Программа прогонит все данные через ваши фильтры и откроет экран с результатом.
                </p>

                <div className="p-4 bg-slate-900 rounded-xl flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary rounded text-white font-bold uppercase text-[10px] tracking-widest animate-pulse">
                        <Play fill="currentColor" size={ 12 } />
                        Запустить сбор
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-primary/20">
                        3
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Скачайте результат</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    На экране результатов вы увидите итоговую чистую таблицу. В правой панели выберите удобный формат:
                </p>

                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 border border-slate-200 rounded text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Excel (.xlsx)</div>
                    <div className="p-3 border border-slate-200 rounded text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">CSV</div>
                    <div className="p-3 border border-slate-200 rounded text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">JSON</div>
                </div>
            </section>

            <section className="space-y-4 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                <div className="flex items-center gap-2 text-primary-700">
                    <CheckCircle2 size={ 20 } />
                    <h3 className="text-sm font-black uppercase tracking-tight">Поздравляем!</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                    Вы только что создали свою первую автоматическую выгрузку. Теперь вы можете сохранить этот набор действий как
                    { " " }
                    <b>Шаблон</b>
                    { }
                    ,
                    чтобы в следующий раз просто загрузить новый файл и получить результат нажатием одной кнопки.
                </p>
            </section>

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/quick-start/upload"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/ui/pipeline"
                    variant="flat"
                >
                    Раздел: Интерфейс
                </Button>
            </div>
        </div>
    );
}
