"use client";

import { Columns, Scissors, Search, Type, Plus, Trash2, ArrowRight, Info, MousePointer2 } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function TransformLayersPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Columns size={ 14 } />
                    Библиотека функций
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Трансформация
                    { " " }
                    <span className="text-primary">Колонок</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Здесь вы создаете «лицо» вашего будущего отчета. Выбирайте нужные столбцы, меняйте их местами
                    и извлекайте скрытые данные из текста.
                </p>
            </header>

            <Divider />

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <MousePointer2 size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Проекция: Главный чертеж</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Это самый важный шаг. Здесь вы решаете, какие колонки попадут в финальный файл и как они будут называться.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-2">
                            <h4 className="text-xs font-black text-slate-800 uppercase">Автоматический режим</h4>

                            <p className="text-[11px] text-slate-500 leading-normal">
                                Укажите номер строки, где в Excel написаны заголовки. Программа сама найдет все колонки и создаст структуру таблицы.
                            </p>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 space-y-2">
                            <h4 className="text-xs font-black text-slate-800 uppercase">Ручной режим</h4>

                            <p className="text-[11px] text-slate-500 leading-normal">
                                Вы сами выбираете колонки галочками и даете им новые имена. Полезно, если в исходном файле вообще нет нормальных заголовков.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Scissors size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Разделение колонки</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Позволяет разбить одну ячейку на несколько. Например, если в одной колонке написано «Бренд / Модель», вы можете разделить их на две отдельные колонки.
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 p-4 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                        <span className="text-xs text-slate-600 italic">Apple / iPhone 15</span>
                        <ArrowRight className="text-primary" size={ 16 } />

                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold">Apple</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold">iPhone 15</span>
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">Разделять можно по любому символу: запятая, пробел, косая черта и т.д.</p>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Search size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Regex: Умный поиск</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Этот инструмент работает как «магнит». Он вытягивает из длинного текста только то, что подходит под ваш шаблон.
                </p>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-400">Пример использования:</h4>

                    <p className="text-xs text-slate-600">
                        В ячейке написано:
                        { " " }
                        <i>«В наличии 50 шт, цена за ед. 1500р»</i>
                        .
                        { " " }
                        <br />
                        С помощью шаблона
                        { " " }
                        <b>\d+</b>
                        { " " }
                        программа вытянет из этой строки только число
                        { " " }
                        <b>50</b>
                        { }
                        .
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Вспомогательные действия</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <MiniAction desc="Создает новую колонку с одинаковым текстом во всех строках." icon={ <Plus size={ 14 } /> } title="Добавить колонку" />
                    <MiniAction desc="Просто выбрасывает ненужные столбцы из таблицы." icon={ <Trash2 size={ 14 } /> } title="Удалить колонку" />
                    <MiniAction desc="Быстрое изменение заголовка любой колонки." icon={ <Type size={ 14 } /> } title="Переименовать" />
                    <MiniAction desc="Перетаскивание колонок влево или вправо." icon={ <Columns size={ 14 } /> } title="Порядок" />
                </div>
            </section>

            <Card className="bg-amber-50 border border-amber-100 shadow-none" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start">
                    <div className="p-3 bg-white rounded-xl text-amber-500 shrink-0 border border-amber-100">
                        <Info size={ 24 } />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-amber-800 uppercase tracking-tight">Внимание к индексам</h4>

                        <p className="text-xs text-amber-700 leading-relaxed italic">
                            Если вы удалите колонку или разделите её, «адреса» остальных колонок изменятся.
                            Поэтому старайтесь настраивать структуру таблицы (Проекцию) в самом начале вашего списка действий.
                        </p>
                    </div>
                </CardBody>
            </Card>

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/layers/filters"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/layers/matrix"
                    variant="flat"
                >
                    Дальше: Работа с Матрицами
                </Button>
            </div>
        </div>
    );
}

const MiniAction = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-3 p-3 bg-white border border-slate-100 rounded-lg items-start">
        <div className="mt-1 text-primary">{ icon }</div>

        <div>
            <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">{ title }</h4>
            <p className="text-[10px] text-slate-400 leading-tight">{ desc }</p>
        </div>
    </div>
);
