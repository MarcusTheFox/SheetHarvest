"use client";

import { PageFooter } from "@/widgets/footer/ui";
import { PageHeader } from "@/widgets/header/ui";
import { PageMain } from "@/widgets/main/ui";

export const HomePage = () => {
    return (
        <div className="h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/20">
            <PageHeader />
            <PageMain />
            <PageFooter />
        </div>
    );
};
