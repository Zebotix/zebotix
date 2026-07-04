import type { ReactNode } from "react";

import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

interface AdminFormSectionProps {
  readonly title: string;
  readonly description?: string;
  readonly action?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
  readonly bordered?: boolean;
}

export function AdminFormSection({
  title,
  description,
  action,
  children,
  className,
  bordered = true,
}: AdminFormSectionProps) {
  return (
    <section className={cn(bordered && "border-t border-border pt-6", className)}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function AdminFormDivider() {
  return <Separator />;
}
