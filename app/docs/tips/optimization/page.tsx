"use client";

import { Lightbulb, Zap, Activity, Layers, Trash2, ArrowRight, Gauge, MousePointer2 } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function OptimizationPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Заголовок */}
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Lightbulb size={14} />
                    Советы
                </div>
                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Как ускорить <span className="text-primary">работу</span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                    SheetHarvest — быстрый инструмент, но при работе с очень большими таблицами (от 10 000 строк) 
                    правильный порядок действий может сэкономить вам много времени.
                </p>
            </header>

            <Divider />

            {/* Принцип воронки */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Gauge size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">1. Принцип воронки</h2>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                    Самое главное правило: <b>удаляйте лишнее как можно раньше</b>. 
                    Если в вашем файле 50 000 строк, а вам нужны только 5 000 из них, первым делом добавьте слои фильтрации (Якоря, Топологию или Пропуск строк). 
                </p>

                <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                    <CardBody className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1 space-y-2">
                                <h4 className="text-xs font-bold text-slate-200 uppercase">Почему это важно?</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Каждый следующий слой в списке обрабатывает тот объем данных, который ему передал предыдущий. 
                                    Чем меньше строк «доедет» до сложных инструментов (вроде Regex или Разделения колонки), 
                                    тем быстрее будет работать интерфейс.
                                </p>
                            </div>
                            <div className="shrink-0 flex flex-col items-center">
                                <div className="w-20 h-8 bg-primary/40 rounded-t-full border-x border-t border-primary/60" />
                                <div className="w-12 h-8 bg-primary/60 border-x border-primary/80" />
                                <div className="w-6 h-8 bg-primary rounded-b-lg shadow-lg shadow-primary/50" />
                                <span className="text-[9px] font-black text-primary uppercase mt-2">Фильтр в начале</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </section>

            {/* Гигиена браузера */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Activity size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">2. Ресурсы компьютера</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Поскольку SheetHarvest не использует сервер, вся нагрузка ложится на оперативную память вашего компьютера.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="p-2 bg-white rounded border border-slate-200 text-slate-400">
                                <Zap size={16} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Лишние вкладки</h4>
                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Если вы чувствуете, что интерфейс начал «подлагивать», попробуйте закрыть тяжелые вкладки (YouTube, почту, карты). Это освободит память для обработки таблицы.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="p-2 bg-white rounded border border-slate-200 text-slate-400">
                                <MousePointer2 size={16} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Предпросмотр частями</h4>
                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Вам не обязательно всегда запускать весь Пайплайн. Используйте кнопку «Play» на конкретном шаге, чтобы проверить настройки только этого участка.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            {/* Сопоставление: один раз и навсегда */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Layers size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">3. Повторное использование</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Используйте <b>Value Mapping</b> (Сопоставление) максимально широко. 
                    Чем больше названий вы внесете в глобальную базу, тем меньше вам придется вручную править заголовки в будущем. 
                    Программа со временем «выучит» ваш ассортимент и будет нормализовать его автоматически.
                </p>
            </section>

            {/* Золотой совет */}
            <Card className="bg-primary-50 border-none shadow-none" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start text-primary-900">
                    <div className="p-3 bg-white rounded-xl text-primary shrink-0 shadow-sm border border-primary-100">
                        <Trash2 size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-tight">Очистка перед финишем</h4>
                        <p className="text-xs text-primary-700 leading-relaxed italic">
                            «Перед тем как нажать „Запустить сбор“, пройдитесь по списку колонок в Проекции. 
                            Часто мы оставляем лишние технические столбцы, которые не нужны в финальном отчете. 
                            Удалите их — это сделает итоговый файл меньше и чище».
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Подвал навигации */}
            <div className="pt-10 flex justify-between items-center">
                <Button 
                    as={Link} 
                    href="/docs/export/formats" 
                    variant="light"
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                >
                    Назад
                </Button>
                <Button 
                    as={Link} 
                    href="/docs/tips/regex" 
                    color="primary" 
                    variant="flat"
                    className="font-bold uppercase text-[10px] tracking-widest"
                    endContent={<ArrowRight size={14} />}
                >
                    Последний раздел: Шпаргалка Regex
                </Button>
            </div>
        </div>
    );
}