"use client";

import React from "react";
import { Link } from "@heroui/react";
import {
    Book,
    Zap,
    LayoutDashboard,
    Layers,
    Globe,
    Save,
    Lightbulb,
    ArrowLeft,
} from "lucide-react";
import { Logo } from "@/widgets/logo/ui";
import { ScrollShadow, Divider, Button } from "@heroui/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menuConfig = [
    {
        title: "Введение",
        icon: Book,
        items: [
            { label: "О приложении", href: "/docs/intro" },
            { label: "Основные концепции", href: "/docs/concepts" },
            { label: "Системные требования", href: "/docs/requirements" },
        ],
    },
    {
        title: "Быстрый старт",
        icon: Zap,
        items: [
            { label: "Загрузка файла", href: "/docs/quick-start/upload" },
            { label: "Первая выгрузка", href: "/docs/quick-start/first-run" },
        ],
    },
    {
        title: "Интерфейс",
        icon: LayoutDashboard,
        items: [
            { label: "Панель функций", href: "/docs/ui/pipeline" },
            { label: "Предпросмотр данных", href: "/docs/ui/preview" },
            { label: "Настройки шага", href: "/docs/ui/settings" },
        ],
    },
    {
        title: "Библиотека функций",
        icon: Layers,
        items: [
            { label: "Навигация (Якоря/Пропуск)", href: "/docs/layers/navigation" },
            { label: "Фильтрация (Топология/Типы)", href: "/docs/layers/filters" },
            { label: "Трансформация (Regex/Split)", href: "/docs/layers/transform" },
            { label: "Матрицы", href: "/docs/layers/matrix" },
        ],
    },
    {
        title: "Глобальные возможности",
        icon: Globe,
        items: [
            { label: "Сопоставление (Value Mapping)", href: "/docs/features/mapping" },
        ],
    },
    {
        title: "Шаблоны и Экспорт",
        icon: Save,
        items: [
            { label: "Работа с шаблонами", href: "/docs/export/templates" },
            { label: "Форматы файлов", href: "/docs/export/formats" },
        ],
    },
    {
        title: "Советы",
        icon: Lightbulb,
        items: [
            { label: "Оптимизация", href: "/docs/tips/optimization" },
            { label: "Шпаргалка по Regex", href: "/docs/tips/regex" },
        ],
    },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/20">
            { /* Header */ }

            <header className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center">
                    <Logo subtitle="Руководство пользователя" suffix="Docs" />
                </div>

                <Button
                    as={ Link }
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-600"
                    href="/"
                    startContent={ <ArrowLeft size={ 14 } /> }
                    variant="light"
                >
                    Вернуться в приложение
                </Button>
            </header>

            <div className="flex-1 flex overflow-hidden">
                { /* Sidebar Navigation */ }

                <aside className="w-72 border-r border-slate-200 bg-white flex flex-col shrink-0">
                    <ScrollShadow className="flex-1 p-4">
                        <nav className="space-y-6">
                            { menuConfig.map(( group ) => (
                                <div key={ group.title } className="space-y-2">
                                    <div className="flex items-center gap-2 px-2 text-slate-400">
                                        <group.icon size={ 14 } />

                                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                                            { group.title }
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        { group.items.map(( item ) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={ item.href }
                                                    className={ clsx(
                                                        "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                                        isActive
                                                            ? "bg-primary-50 text-primary shadow-sm"
                                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                                    ) }
                                                    href={ item.href }
                                                >
                                                    { item.label }
                                                </Link>
                                            );
                                        }) }
                                    </div>

                                    <Divider className="opacity-50 mt-4" />
                                </div>
                            )) }
                        </nav>
                    </ScrollShadow>
                </aside>

                { /* Main Content Area */ }

                <main className="flex-1 overflow-auto bg-white">
                    <div className="max-w-4xl mx-auto py-12 px-12 min-h-full">
                        { children }
                    </div>
                </main>
            </div>

            { /* Footer Mini */ }

            <footer className="h-8 px-6 bg-slate-900 flex items-center justify-between text-white shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    © 2025 SheetHarvest Documentation System
                </span>

                <span className="text-[9px] font-mono text-slate-500">
                    Ver. 1.0.4-stable
                </span>
            </footer>
        </div>
    );
}
