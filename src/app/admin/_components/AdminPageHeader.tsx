import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
  readonly action?: ReactNode;
}

export function AdminPageHeader({ title, description, icon: Icon, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
          {Icon ? <Icon className="text-blue-600 dark:text-blue-400" /> : null}
          {title}
        </h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}
