import { AdminPageHeader } from "./AdminPageHeader";

import type { ReactNode } from "react";

interface AdminEditorShellProps {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}

export function AdminEditorShell({ title, description, children }: AdminEditorShellProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader title={title} description={description} />
      <div className=" glassmorphism rounded-2xl border border-white/5 p-6">{children}</div>
    </div>
  );
}
