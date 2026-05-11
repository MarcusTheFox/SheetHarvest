"use client";

import {
    Regex, Terminal, BookOpen, GraduationCap,
    Code2, ShieldCheck, Microscope,
    ExternalLink, AlertTriangle, Layers,
} from "lucide-react";
import { Divider, Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function RegexGuidePage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <header className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                    <Regex size={ 14 } />
                    Справочник
                </div>

                <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
                    Регулярные
                    { " " }
                    <span className="text-primary">выражения</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed">
                    Регулярное выражение (Regex) — это «умный трафарет» для поиска текста.
                    Если обычный поиск ищет точное слово (например, «Артикул 123»), то Regex
                    позволяет сказать программе:
                    { " " }
                    <i>«Найди мне слово &quot;Артикул&quot;, после которого идет пробел и ровно 3 любые цифры»</i>
                    { }
                    .
                </p>
            </header>

            <Divider />

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <GraduationCap size={ 20 } />
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">С чего начать?</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Regex состоит из обычных символов (которые ищутся как есть) и
                    { " " }
                    <b>Метасимволов</b>
                    { " " }
                    (специальных команд).
                    Например, буква
                    { " " }
                    <code>A</code>
                    { " " }
                    ищет букву «А», а команда
                    { " " }
                    <code>\d</code>
                    { " " }
                    ищет
                    { " " }
                    <b>любую цифру</b>
                    { }
                    .
                    Создание формулы похоже на сборку конструктора Lego: вы берете нужные детали и ставите их друг за другом.
                </p>

                <Card className="bg-slate-900 border-none shadow-xl overflow-hidden" radius="lg">
                    <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Разбор формулы</span>
                        <Microscope className="text-slate-500" size={ 16 } />
                    </div>

                    <CardBody className="p-0">
                        <div className="p-6 border-b border-slate-800 space-y-2">
                            <div className="text-[10px] uppercase font-bold text-slate-500">Текст в ячейке:</div>

                            <div className="font-mono text-lg text-slate-300">
                                Товар
                                { " " }
                                <span className="bg-primary/30 text-white px-1 rounded">ART-90210</span>
                                { " " }
                                (на складе)
                            </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 space-y-4">
                            <div className="text-[10px] uppercase font-bold text-slate-500">Ваша формула:</div>

                            <div className="font-mono text-2xl text-white flex gap-1">
                                <span className="text-blue-400 bg-blue-400/10 px-1 rounded border border-blue-400/20">ART-</span>
                                <span className="text-green-400 bg-green-400/10 px-1 rounded border border-green-400/20">\d</span>
                                <span className="text-purple-400 bg-purple-400/10 px-1 rounded border border-purple-400/20">{ "{5}" }</span>
                            </div>

                            <div className="space-y-2 pt-4">
                                <div className="flex gap-3 items-start">
                                    <div className="w-12 shrink-0 font-mono text-blue-400 text-right mt-0.5">ART-</div>

                                    <div className="text-xs text-slate-400 leading-relaxed">
                                        <b>Точное совпадение:</b>
                                        { " " }
                                        Программа ищет ровно эти 4 символа подряд (буквы A, R, T и дефис).
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <div className="w-12 shrink-0 font-mono text-green-400 text-right mt-0.5">\d</div>

                                    <div className="text-xs text-slate-400 leading-relaxed">
                                        <b>Токен (Сущность):</b>
                                        { " " }
                                        Означает «любая цифра от 0 до 9».
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <div className="w-12 shrink-0 font-mono text-purple-400 text-right mt-0.5">{ "{5}" }</div>

                                    <div className="text-xs text-slate-400 leading-relaxed">
                                        <b>Квантификатор (Количество):</b>
                                        { " " }
                                        Говорит программе, что предыдущий символ (цифра) должен повториться ровно 5 раз.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Layers size={ 20 } />
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Квантификаторы (Количество)</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Квантификатор всегда ставится
                    { " " }
                    <b>после</b>
                    { " " }
                    символа или токена и указывает, сколько раз этот символ может встречаться.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <QuantifierCard desc="Символа может не быть вообще, а может быть бесконечно много." name="Ноль или больше" symbol="*" />
                    <QuantifierCard desc="Символ обязательно должен быть хотя бы один раз." name="Один или больше" symbol="+" />
                    <QuantifierCard desc="Делает предыдущий символ необязательным (или есть, или нет)." name="Ноль или один" symbol="?" />
                    <QuantifierCard desc="Например, \d{3} найдет ровно 3 цифры (123)." name="Ровно N раз" symbol="{n}" />
                    <QuantifierCard desc="Например, \w{2,} найдет слова длиной от 2 букв и больше." name="От N и больше" symbol="{n,}" />
                    <QuantifierCard desc="Например, \d{2,4} найдет от 2 до 4 цифр подряд." name="От N до M раз" symbol="{n,m}" />
                </div>

                <Card className="bg-amber-50 border border-amber-200 shadow-none" radius="sm">
                    <CardBody className="p-5 flex gap-4 items-start">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={ 20 } />

                        <div className="space-y-2">
                            <h4 className="text-sm font-bold text-amber-800">«Жадность» квантификаторов</h4>

                            <p className="text-xs text-amber-700 leading-relaxed">
                                По умолчанию
                                { " " }
                                <code>*</code>
                                { " " }
                                и
                                { " " }
                                <code>+</code>
                                { " " }
                                очень жадные — они захватывают максимально длинный кусок текста.
                                { " " }
                                <br/>
                                Если у вас текст
                                { " " }
                                <code>&quot;А&quot;, &quot;Б&quot;, &quot;В&quot;</code>
                                { " " }
                                и вы напишете
                                { " " }
                                <code>&quot;.*&quot;</code>
                                { " " }
                                (кавычка, любой текст, кавычка), он захватит всё от первой до последней кавычки:
                                { " " }
                                <b>&quot;А&quot;, &quot;Б&quot;, &quot;В&quot;</b>
                                .
                                { " " }
                                <br/>
                                Чтобы он остановился на первой же закрывающей кавычке (стал ленивым), добавьте знак вопроса:
                                { " " }
                                <code>&quot;.*?&quot;</code>
                                . Результат:
                                { " " }
                                <b>&quot;А&quot;</b>
                                { }
                                .
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <Code2 size={ 20 } />
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Токены (Алфавит Regex)</h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                    Это специальные коды, которые обозначают группы символов. Заглавная буква всегда означает
                    { " " }
                    <b>противоположность</b>
                    { " " }
                    строчной.
                </p>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <div className="grid grid-cols-[100px_1fr] bg-slate-100 border-b border-slate-200">
                        <div className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Код</div>
                        <div className="p-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Что он ищет</div>
                    </div>

                    <TokenRow desc="Любой символ вообще (кроме переноса строки)." token="." />
                    <TokenRow desc="Любая цифра (от 0 до 9)." token="\d" />
                    <TokenRow desc="Всё, что УГОДНО, только НЕ цифра (буквы, пробелы, знаки)." token="\D" />
                    <TokenRow desc="Словесный символ (буквы a-z, А-Я, цифры 0-9 и знак подчеркивания _)." token="\w" />
                    <TokenRow desc="НЕ словесный символ (пробелы, точки, запятые, дефисы)." token="\W" />
                    <TokenRow desc="Пробельный символ (пробел, табуляция, невидимые отступы)." token="\s" />
                    <TokenRow desc="НЕ пробел (любой видимый символ)." token="\S" />
                    <TokenRow desc="Набор: найдет либо 'a', либо 'b', либо 'c'. Любой ОДИН символ из скобок." token="[abc]" />
                    <TokenRow desc="Отрицание: найдет любой символ, КРОМЕ 'a', 'b' и 'c'." token="[^abc]" />
                    <TokenRow desc="Диапазон: любая маленькая английская буква." token="[a-z]" />
                    <TokenRow desc="Диапазон: любая русская буква (большая или маленькая)." token="[А-Яа-я]" />
                    <TokenRow desc="Аналог \d (любая цифра)." token="[0-9]" />
                    <TokenRow desc="Начало строки. ^Привет найдет слово 'Привет' только если оно стоит в самом начале." token="^" />
                    <TokenRow desc="Конец строки. Пока$ найдет слово 'Пока' только в самом конце текста." token="$" />
                    <TokenRow desc="Граница слова. \bКот\b найдет слово 'Кот', но проигнорирует его внутри слова 'Который'." token="\b" />
                    <TokenRow desc="Группа. Объединяет символы. (abc)+ найдет 'abcabcabc'." token="(abc)" />
                    <TokenRow desc="ИЛИ. Найдет либо 'a', либо 'b'. Например (cat|dog) найдет кота или собаку." token="(a|b)" />
                    <TokenRow desc="Группа без захвата. Объединяет, но не сохраняет в память (экономит ресурсы)." token="(?:abc)" />
                    <TokenRow desc="Экранирование. Если вам нужно найти саму точку (а не любой символ), напишите \." token="\" />
                    <TokenRow desc="Перенос на новую строку." token="\n" />
                    <TokenRow desc="Символ табуляции (Tab)." token="\t" />
                    <TokenRow desc="Позитивный просмотр вперед. Найдет позицию ПЕРЕД 'abc', не захватывая само 'abc'." token="(?=abc)" />
                    <TokenRow desc="Негативный просмотр вперед. Убеждается, что впереди НЕТ 'abc'." token="(?!abc)" />
                    <TokenRow desc="Позитивный просмотр назад. Найдет позицию ПОСЛЕ 'abc'." token="(?<=abc)" />
                    <TokenRow desc="Негативный просмотр назад. Убеждается, что сзади НЕТ 'abc'." token="(?<!abc)" />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        <BookOpen size={ 20 } />
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Готовые рецепты</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RecipeCard
                        code="[\w\.-]+@[\w\.-]+\.\w+"
                        desc="Ищет буквы/цифры/дефисы, затем @, затем домен и зону (.com, .ru)."
                        title="Поиск E-mail адреса"
                    />

                    <RecipeCard
                        code="(\+7|8)\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}"
                        desc="Учитывает номера с +7 или 8, со скобками, дефисами и пробелами."
                        title="Поиск номера телефона (РФ)"
                    />

                    <RecipeCard
                        code="\d+([.,]\d{1,2})?"
                        desc="Ищет целое число, после которого может быть запятая/точка и 1-2 цифры."
                        title="Поиск цены (с копейками)"
                    />

                    <RecipeCard
                        code="[A-Za-z0-9-]+"
                        desc="Вытягивает непрерывную строку из букв, цифр и дефисов."
                        title="Артикул из английских букв и цифр"
                    />

                    <RecipeCard
                        code="\((.*?)\)"
                        desc="Найдет всё, что находится между ( и ). Символ экранирования \ нужен, т.к. скобки — это спецсимвол."
                        title="Извлечение текста из скобок"
                    />

                    <RecipeCard
                        code="\s{2,}"
                        desc="Находит 2 и более пробелов подряд (чтобы потом заменить их на один)."
                        title="Удаление лишних пробелов"
                    />
                </div>
            </section>

            <Card className="bg-slate-50 border border-slate-200" radius="lg">
                <CardBody className="p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-primary shrink-0">
                        <Terminal size={ 32 } />
                    </div>

                    <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Тренируйтесь на Regex101</h3>

                        <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                            Регулярные выражения сложно написать с первого раза без ошибок.
                            Мы настоятельно рекомендуем сайт
                            { " " }
                            <b>regex101.com</b>
                            { " " }
                            — это лучший в мире бесплатный тренажер.
                            Вставьте туда ваш текст, пишите формулу и смотрите, как она подсвечивает совпадения в реальном времени.
                        </p>
                    </div>

                    <Button
                        as={ Link }
                        className="font-bold uppercase tracking-widest text-xs"
                        color="primary"
                        endContent={ <ExternalLink size={ 16 } /> }
                        href="https://regex101.com/"
                        target="_blank"
                    >
                        Открыть Regex101
                    </Button>
                </CardBody>
            </Card>

            <div className="pt-10 flex justify-between items-center">
                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest text-slate-400"
                    href="/docs/tips/optimization"
                    variant="light"
                >
                    Назад
                </Button>

                <Button
                    as={ Link }
                    className="font-bold uppercase text-[10px] tracking-widest bg-success/10 text-success-700"
                    color="success"
                    href="/"
                    startContent={ <ShieldCheck size={ 14 } /> }
                    variant="flat"
                >
                    Перейти к приложению
                </Button>
            </div>
        </div>
    );
}

// Вспомогательные компоненты для UI
const QuantifierCard = ({ symbol, name, desc }: { symbol: string, name: string, desc: string }) => (
    <div className="p-4 bg-white border border-slate-100 rounded-lg flex gap-4 items-start shadow-sm">
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-primary font-mono text-lg font-bold shrink-0">
            { symbol }
        </div>

        <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">{ name }</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{ desc }</p>
        </div>
    </div>
);

const TokenRow = ({ token, desc }: { token: string, desc: string }) => (
    <div className="grid grid-cols-[100px_1fr] border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
        <div className="p-3 border-r border-slate-100 flex items-center justify-center">
            <code className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">{ token }</code>
        </div>

        <div className="p-3 text-xs text-slate-600 flex items-center leading-relaxed">
            { desc }
        </div>
    </div>
);

const RecipeCard = ({ title, code, desc }: { title: string, code: string, desc: string }) => (
    <div className="p-5 bg-slate-800 rounded-xl space-y-3 shadow-lg">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">{ title }</h4>

        <div className="p-3 bg-slate-950 rounded border border-slate-700 text-green-400 font-mono text-sm break-all">
            { code }
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
            { desc }
        </p>
    </div>
);
