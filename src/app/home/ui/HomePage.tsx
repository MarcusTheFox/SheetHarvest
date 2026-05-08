"use client";

import { PageFooter } from "@/widgets/footer/ui";
import { PageHeader } from "@/widgets/header/ui";
import { PageMain } from "@/widgets/main/ui";

export const HomePage = () => {
  return (
    <div className="h-screen flex flex-col">
      <PageHeader />

      <PageMain />

      <PageFooter />
    </div>
  );
};