"use client";

import { Globe, Database, ArrowRight, Save, CheckCircle2, RefreshCw, ShieldCheck, Search } from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function MappingPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Globe size={ 14 } />
                    Глобальные возможности
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Сопоставление
                    { " " }
                    <span className="text-primary">значений</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Часто в прайсах один и тот же бренд написан по-разному:
                    { " " }
                    <i>«Sams.»</i>
                    ,
                    { " " }
                    <i>«SAMS»</i>
                    { " " }
                    или
                    { " " }
                    <i>«Samsung»</i>
                    { }
                    .
                    Инструмент сопоставления превращает этот хаос в идеальный порядок.
                </p>
            </header>

            <Divider />

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Ваш личный переводчик</h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Этот инструмент работает как «умный словарь». Вы выбираете колонку (например, «Бренд»),
                    и программа показывает вам все уникальные значения, которые она там нашла.
                    Вы просто один раз пишете правильный вариант напротив каждого сокращения.
                </p>

                <Card className="border-none shadow-none bg-slate-50 p-6" radius="lg">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="text-center space-y-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">В файле написано</div>
                            <div className="px-3 py-2 bg-white rounded border border-slate-200 text-xs font-mono">App.</div>
                        </div>

                        <RefreshCw className="text-primary animate-spin-slow" size={ 20 } />

                        <div className="text-center space-y-1">
                            <div className="text-[10px] font-bold text-primary uppercase">В результате будет</div>
                            <div className="px-3 py-2 bg-primary text-white rounded font-bold text-xs">Apple</div>
                        </div>
                    </div>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Database size={ 20 } />
                    </div>

                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Глобальная база знаний</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Это
                    { " " }
                    <b>самое важное</b>
                    { " " }
                    преимущество: ваши исправления сохраняются не только для текущего файла,
                    а в памяти вашего браузера.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 flex gap-4">
                            <CheckCircle2 className="text-success shrink-0" size={ 20 } />

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Обучение один раз</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Если завтра вы загрузите другой файл от другого поставщика, и там снова будет
                                    { " " }
                                    <i>«App.»</i>
                                    ,
                                    программа сама заменит его на
                                    { " " }
                                    <i>«Apple»</i>
                                    { }
                                    . Вам не нужно делать это снова.
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border border-slate-100 shadow-none bg-slate-50/50" radius="sm">
                        <CardBody className="p-5 flex gap-4">
                            <ShieldCheck className="text-primary shrink-0" size={ 20 } />

                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 uppercase">Полная приватность</h4>

                                <p className="text-[11px] text-slate-500 leading-normal">
                                    Ваша база сопоставлений хранится только на вашем компьютере. Мы не собираем ваши списки товаров и брендов.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Как управлять базой</h2>

                <div className="space-y-4">
                    <FeatureRow
                        desc="В настройках шага вы можете открыть кнопку «База» и посмотреть все сохраненные ранее пары (Оригинал → Замена)."
                        icon={ <Search size={ 16 } /> }
                        title="Поиск по базе"
                    />

                    <FeatureRow
                        desc="Если вы ошиблись при вводе правильного названия, вы всегда можете найти его в базе и нажать на крестик для удаления."
                        icon={ <Save size={ 16 } /> }
                        title="Удаление старых правил"
                    />
                </div>
            </section>

            <Card className="bg-slate-900 border-none shadow-xl" radius="lg">
                <CardBody className="p-6 flex flex-row gap-5 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-primary shrink-0">
                        <RefreshCw size={ 24 } />
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">Автоматическая нормализация</h4>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            Программа сама сравнивает текст, не обращая внимания на РЕГИСТР букв.
                            Для системы «apple», «APPLE» и «Apple» — это одно и то же слово.
                            Если вы один раз сопоставили любое из них, остальные подхватятся автоматически.
                        </p>
                    </div>
                </CardBody>
            </Card>

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/layers/matrix"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest"
                    color="primary"
                    endContent={ <ArrowRight size={ 14 } /> }
                    href="/docs/export/templates"
                    variant="flat"
                >
                    Дальше: Шаблоны и Экспорт
                </Button>
            </div>
        </div>
    );
}

const FeatureRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-lg transition-colors">
        <div className="mt-1 shrink-0 text-primary">
            { icon }
        </div>

        <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{ title }</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{ desc }</p>
        </div>
    </div>
);
