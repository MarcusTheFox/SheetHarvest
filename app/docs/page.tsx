"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { 
    Zap, 
    Layers, 
    TableProperties, 
    FileJson, 
    ShieldCheck, 
    ArrowRight,
    MousePointer2,
    Globe
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <section className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    <Zap size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Base of Knowledge</span>
                </div>
                <h1 className="text-5xl font-black text-slate-800 uppercase tracking-tighter leading-none">
                    Добро пожаловать в <br />
                    <span className="text-primary">SheetHarvest Docs</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                    SheetHarvest — это мощный инструмент для трансформации сложных, «грязных» таблиц в чистые структурированные данные. 
                    Узнайте, как автоматизировать рутину и превратить хаос в порядок.
                </p>
                <div className="pt-4 flex gap-3">
                    <Button 
                        as={Link} 
                        href="/docs/quick-start/upload" 
                        color="primary" 
                        size="lg" 
                        className="font-bold uppercase text-xs tracking-widest"
                        endContent={<ArrowRight size={16} />}
                    >
                        Начать обучение
                    </Button>
                    <Button 
                        as={Link} 
                        href="/" 
                        variant="bordered" 
                        size="lg" 
                        className="font-bold uppercase text-xs tracking-widest border-slate-200"
                    >
                        Открыть приложение
                    </Button>
                </div>
            </section>

            {/* Core Concepts Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none bg-slate-50 shadow-none" radius="lg">
                    <CardBody className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                            <MousePointer2 size={24} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">No-Code Трансформация</h3>
                        <p className="text-xs text-slate-500 leading-normal">
                            Вам не нужно писать макросы или скрипты. Просто добавляйте визуальные блоки-функции в ваш пайплайн.
                        </p>
                    </CardBody>
                </Card>

                <Card className="border-none bg-slate-50 shadow-none" radius="lg">
                    <CardBody className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">Многослойная логика</h3>
                        <p className="text-xs text-slate-500 leading-normal">
                            Каждое изменение — это слой. Вы всегда видите данные «до» и «после» выполнения конкретного шага.
                        </p>
                    </CardBody>
                </Card>

                <Card className="border-none bg-slate-50 shadow-none" radius="lg">
                    <CardBody className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">Умная Валидация</h3>
                        <p className="text-xs text-slate-500 leading-normal">
                            Автоматическая проверка типов данных и сопоставление по глобальным словарям (Value Mapping).
                        </p>
                    </CardBody>
                </Card>
            </section>

            {/* Quick Navigation Cards */}
            <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                    <TableProperties className="text-primary" size={20} />
                    Популярные разделы
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: "Работа с Якорями",
                            desc: "Как вырезать нужную таблицу из огромного листа с мусором.",
                            icon: MousePointer2,
                            href: "/docs/layers/navigation"
                        },
                        {
                            title: "Regex Извлечение",
                            desc: "Тонкая настройка поиска артикулов, цен и дат с помощью регулярных выражений.",
                            icon: FileJson,
                            href: "/docs/layers/transform"
                        },
                        {
                            title: "Словари сопоставления",
                            desc: "Обучите систему узнавать ваши товары и бренды автоматически.",
                            icon: Globe,
                            href: "/docs/features/mapping"
                        },
                        {
                            title: "Разделение матриц",
                            desc: "Превращаем сложные прайсы с остатками по складам в плоские списки.",
                            icon: Layers,
                            href: "/docs/layers/matrix"
                        }
                    ].map((item, i) => (
                        <Link key={i} href={item.href}>
                            <Card className="border border-slate-100 hover:border-primary/40 hover:shadow-lg transition-all group" shadow="none">
                                <CardBody className="p-4 flex flex-row items-center gap-4">
                                    <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                                        <p className="text-[11px] text-slate-500">{item.desc}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Support/Footer info */}
            <section className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-black uppercase tracking-tight">Нужна помощь с интеграцией?</h3>
                    <p className="text-slate-400 text-xs">Наши специалисты помогут настроить сложные шаблоны для ваших файлов.</p>
                </div>
                <Button color="primary" className="font-bold uppercase text-xs tracking-widest px-8">
                    Связаться с нами
                </Button>
            </section>
        </div>
    );
}