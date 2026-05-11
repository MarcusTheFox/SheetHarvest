"use client";

import {
    Button, Popover, PopoverTrigger, PopoverContent,
    Input, ScrollShadow, Listbox, ListboxItem,
} from "@heroui/react";
import { Search, PlusCircle } from "lucide-react";
import { useState, useMemo, ReactNode } from "react";

import { clsx } from "clsx";

interface SearchSelectItem {
    id: string;
    name: string;
    description?: string;
}

interface SearchSelectPopoverProps {
    items: SearchSelectItem[];
    onSelect: ( id: string ) => void;
    trigger?: ReactNode;
    placeholder?: string;
    label?: string;
    classNames?: {
        base?: string;
        trigger?: string;
        content?: string;
        inputWrapper?: string;
        input?: string;
        scrollShadow?: string;
        listbox?: string;
        item?: string;
        itemDescription?: string;
    };
}

export const SearchSelectPopover = ({
    items,
    onSelect,
    trigger,
    placeholder = "Поиск...",
    label = "Выбрать",
    classNames = {},
}: SearchSelectPopoverProps ) => {
    const [ isOpen, setIsOpen ] = useState( false );
    const [ search, setSearch ] = useState( "" );

    const filteredItems = useMemo(() => {
        if ( !search ) return items;
        const s = search.toLowerCase();
        return items.filter(( item ) =>
            item.name.toLowerCase().includes( s )
            || item.description?.toLowerCase().includes( s ));
    }, [ items, search ]);

    return (
        <Popover isOpen={ isOpen } placement="bottom-end" onOpenChange={ setIsOpen }>
            <PopoverTrigger>
                { trigger || (
                    <Button
                        isIconOnly
                        className={ classNames.trigger }
                        color="primary"
                        size="sm"
                        variant="flat"
                    >
                        <PlusCircle size={ 18 } />
                    </Button>
                ) }
            </PopoverTrigger>

            <PopoverContent
                className={ clsx(
                    "p-0 overflow-hidden",
                    classNames.content || "w-64",
                    classNames.base,
                ) }
            >
                <div className={ clsx( "p-2 border-b border-default-100 w-full", classNames.inputWrapper ) }>
                    <Input
                        autoFocus
                        classNames={{
                            input: classNames.input,
                        }}
                        placeholder={ placeholder }
                        size="sm"
                        startContent={ <Search size={ 14 } /> }
                        value={ search }
                        variant="flat"
                        onValueChange={ setSearch }
                    />
                </div>

                <ScrollShadow className={ clsx( "max-h-64 w-full", classNames.scrollShadow ) }>
                    <Listbox
                        aria-label={ label }
                        className={ classNames.listbox }
                        onAction={ ( key ) => {
                            onSelect( key as string );
                            setIsOpen( false );
                            setSearch( "" );
                        } }
                    >
                        { filteredItems.map(( item ) => (
                            <ListboxItem
                                key={ item.id }
                                classNames={{
                                    title: classNames.item,
                                    description: classNames.itemDescription,
                                }}
                                description={ item.description }
                            >
                                { item.name }
                            </ListboxItem>
                        )) }
                    </Listbox>
                </ScrollShadow>
            </PopoverContent>
        </Popover>
    );
};
