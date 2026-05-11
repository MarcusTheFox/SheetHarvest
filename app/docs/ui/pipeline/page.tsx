"use client";

import { Settings2, ArrowUp, ArrowDown, Trash2, Play, CheckCircle2, ListPlus, ArrowRight } from "lucide-react";
import { Divider, Button, Card, CardBody, Chip } from "@heroui/react";
import Link from "next/link";

export default function PipelineUiPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            { /* Заголовок */ }

            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Settings2 size={ 14 } />
                    Интерфейс
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Панель
                    { " " }
                    <span className="text-primary">Функций</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Левая панель (Пайплайн) — это список всех действий, которые программа выполнит с вашей таблицей.
                    Порядок действий имеет значение: данные обрабатываются сверху вниз.
                </p>
            </header>

            <Divider />

            { /* Добавление шагов */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Добавление новых шагов</h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Нажмите на синий плюс в верхней части панели. Откроется список инструментов с поиском.
                    Просто выберите нужный инструмент, и он добавится в конец списка.
                </p>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Button isIconOnly color="primary" size="sm" variant="flat">
                        <ListPlus size={ 18 } />
                    </Button>

                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Кнопка «Добавить слой»</span>
                </div>
            </section>

            { /* Анатомия карточки шага */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Как управлять шагами</h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Каждое действие представлено в виде карточки. На ней есть несколько важных элементов управления:
                </p>

                <div className="space-y-3">
                    <ControlRow
                        desc="Меняют порядок выполнения действий. Например, сначала лучше «Очистить мусор», а потом «Считать сумму»."
                        icon={ <ArrowUp size={ 14 } /> }
                        title="Стрелки вверх/вниз"
                    />

                    <ControlRow
                        desc="Удаляет действие из списка. Это не затронет исходный файл, только текущий шаблон обработки."
                        icon={ <Trash2 className="text-danger" size={ 14 } /> }
                        title="Корзина"
                    />

                    <ControlRow
                        desc="Позволяет увидеть результат работы именно до этого момента. Полезно для проверки настроек."
                        icon={ <Play fill="currentColor" size={ 14 } /> }
                        title="Кнопка запуска шага"
                    />
                </div>
            </section>

            { /* Статусы выполнения */ }

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Цвета и значки (Статусы)</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-success-100 text-success flex items-center justify-center shrink-0">
                                <CheckCircle2 size={ 20 } />
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Готово (Зеленый)</h4>
                                <p className="text-[10px] text-slate-500">Этот шаг уже просчитан, результат сохранен в памяти.</p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none" radius="sm">
                        <CardBody className="p-4 flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                                <Play size={ 20 } />
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Ожидание (Серый)</h4>
                                <p className="text-[10px] text-slate-500">Шаг настроен, но еще не запущен или настройки были изменены.</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            { /* Важное правило */ }

            <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                <CardBody className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Settings2 size={ 18 } />
                        <h3 className="text-sm font-black uppercase tracking-tight text-white">Золотое правило порядка</h3>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                        Если вы измените настройки шага №2, то все шаги ниже (№3, №4 и т.д.) автоматически «сбросятся».
                        Программа поймет, что входные данные для них изменились, и предложит запустить их заново.
                        Это гарантирует, что вы всегда видите актуальный результат.
                    </p>
                </CardBody>
            </Card>

            { /* Подвал навигации */ }

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/quick-start/first-run"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/ui/preview"
                    variant="flat"
                >
                    Следующий: Предпросмотр данных
                </Button>
            </div>
        </div>
    );
}

const ControlRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
        <div className="shrink-0 w-8 h-8 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-400">
            { icon }
        </div>

        <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight">{ title }</h4>
            <p className="text-[11px] text-slate-500 leading-normal">{ desc }</p>
        </div>
    </div>
);
