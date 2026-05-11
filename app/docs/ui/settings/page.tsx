"use client";

import { Settings, Info, MousePointer2, Keyboard, Zap, ArrowRight, HelpCircle } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function SettingsUiPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Settings size={ 14 } />
                    Интерфейс
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Панель
                    { " " }
                    <span className="text-primary">Настроек</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Правая панель подстраивается под выбранный вами шаг.
                    У каждого инструмента свой уникальный набор настроек, но все они работают по общим правилам.
                </p>
            </header>

            <Divider />

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Основные элементы</h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Когда вы выбираете шаг в левой панели, справа открывается его «пульт управления».
                    Обычно он состоит из трех блоков:
                </p>

                <div className="space-y-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-primary shrink-0">
                                <span className="text-[10px] font-black uppercase font-mono">ID</span>
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Шапка (Заголовок шага)</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Здесь указан порядковый номер шага в цепочке и его системное название.
                                    Это помогает не запутаться, если у вас добавлено несколько одинаковых инструментов.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-primary shrink-0">
                                <MousePointer2 size={ 16 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Органы управления</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Выпадающие списки (для выбора колонок), текстовые поля (для поиска) и переключатели.
                                    Все изменения
                                    { " " }
                                    <b>применяются мгновенно</b>
                                    { " " }
                                    к нижней таблице предпросмотра.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-primary shrink-0">
                                <HelpCircle size={ 16 } />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Блок подсказок</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    В самом низу панели настроек почти всегда есть серый блок с пояснением.
                                    Прочитайте его, если не уверены, как именно работает выбранная функция.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Zap fill="currentColor" size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Никаких кнопок «Сохранить»</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    В SheetHarvest нет кнопки «Применить настройки». Программа работает в реальном времени:
                    как только вы ввели символ или выбрали колонку в списке, система тут же пересчитывает результат
                    и обновляет таблицу в центре экрана.
                </p>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-4 items-start">
                    <Info className="text-amber-600 shrink-0 mt-0.5" size={ 18 } />

                    <p className="text-xs text-amber-800 leading-relaxed italic">
                        Если после изменения настроек нижняя таблица стала пустой — значит, ваши правила слишком строгие
                        или в выбранной колонке нет данных, подходящих под условия.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Keyboard className="text-primary" size={ 20 } />
                    Быстрый ввод
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Для удобства вы можете переключаться между текстовыми полями в панели настроек
                    с помощью клавиши
                    { " " }
                    <b>Tab</b>
                    { }
                    . Все списки выбора поддерживают поиск — просто начните печатать название колонки.
                </p>
            </section>

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/ui/preview"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/layers/navigation"
                    variant="flat"
                >
                    Раздел: Библиотека функций
                </Button>
            </div>
        </div>
    );
}
