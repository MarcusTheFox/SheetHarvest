"use client";

import { Eye, Table, ArrowDown, Split, MousePointer2, ArrowRight } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function PreviewUiPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Eye size={ 14 } />
                    Интерфейс
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Окно
                    { " " }
                    <span className="text-primary">Просмотра</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Центральная часть экрана — это зеркало ваших данных. Здесь вы видите, как именно меняется ваша таблица после применения каждого инструмента.
                </p>
            </header>

            <Divider />

            { /* Концепция До и После */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Split className="text-primary" size={ 20 } />
                    Сравнение «До» и «После»
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Когда вы выбираете любой шаг в списке слева, экран делится на две части (горизонтально). Это позволяет мгновенно понять, сработало ли ваше правило.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-200 shadow-none bg-slate-50/30" radius="sm">
                        <CardBody className="p-5 space-y-2">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Верхняя таблица</div>
                            <h4 className="text-sm font-bold text-slate-800">Данные на входе</h4>

                            <p className="text-xs text-slate-500 leading-normal">
                                Показывает состояние таблицы
                                { " " }
                                <b>до</b>
                                { " " }
                                того, как текущий инструмент её коснулся. Это то, что передал предыдущий шаг.
                            </p>
                        </CardBody>
                    </Card>

                    <Card className="border border-primary/20 shadow-none bg-primary/5" radius="sm">
                        <CardBody className="p-5 space-y-2">
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">Нижняя таблица</div>
                            <h4 className="text-sm font-bold text-slate-800">Данные на выходе</h4>

                            <p className="text-xs text-slate-500 leading-normal">
                                Результат работы текущего инструмента. Если вы настроили фильтр, здесь строк будет меньше, чем в верхней таблице.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </section>

            { /* Работа с таблицей */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Удобство навигации</h2>

                <div className="space-y-4">
                    <FeatureRow
                        desc="Верхняя строка с именами колонок и левый столбец с номерами строк всегда остаются на месте при прокрутке. Вы не потеряетесь в больших данных."
                        icon={ <MousePointer2 size={ 16 } /> }
                        title="Закрепленные заголовки"
                    />

                    <FeatureRow
                        desc="При наведении курсора на строку она подсвечивается. Это помогает следить за значениями в очень широких таблицах."
                        icon={ <Table size={ 16 } /> }
                        title="Подсветка строк"
                    />

                    <FeatureRow
                        desc="Если ваш файл состоит из нескольких листов или таблиц, программа покажет полосы-разделители с названием листа и количеством строк в нем."
                        icon={ <ArrowDown size={ 16 } /> }
                        title="Разделители групп"
                    />
                </div>
            </section>

            { /* Совет по интерфейсу */ }

            <Card className="bg-slate-50 border border-slate-200 shadow-none" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 shrink-0">
                        <Split size={ 24 } />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-800 uppercase">Изменение размера</h4>

                        <p className="text-xs text-slate-600 leading-relaxed">
                            Вы можете менять высоту областей «До» и «После». Просто зажмите мышкой
                            { " " }
                            <b>разделительную линию</b>
                            { " " }
                            между таблицами и потяните её вверх или вниз.
                        </p>
                    </div>
                </CardBody>
            </Card>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/ui/pipeline"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/ui/settings"
                    variant="flat"
                >
                    Следующий: Настройки шага
                </Button>
            </div>
        </div>
    );
}

const FeatureRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-4 items-start">
        <div className="mt-1 shrink-0 text-primary">
            { icon }
        </div>

        <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">{ title }</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{ desc }</p>
        </div>
    </div>
);
