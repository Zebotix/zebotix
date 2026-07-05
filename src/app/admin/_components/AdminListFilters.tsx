import { Search } from "lucide-react";

import type { ReactNode } from "react";

import {
  ADMIN_BUTTON_OUTLINE_CLASS,
  ADMIN_FIELD_CLASS,
  ADMIN_FILTER_SELECT_CLASS,
} from "@/app/admin/_components/admin-styles";
import { AdminFormSelect } from "@/app/admin/_components/AdminFormSelect";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AdminListFiltersProps {
  readonly searchPlaceholder?: string;
  readonly defaultQuery?: string;
  readonly children?: ReactNode;
}

export function AdminListFilters({
  searchPlaceholder = "Search…",
  defaultQuery = "",
  children,
}: AdminListFiltersProps) {
  return (
    <div className="glassmorphism rounded-2xl border border-white/8 p-4">
      <form className="flex flex-col gap-3 lg:flex-row lg:items-center" method="GET">
        <div className="relative w-full lg:min-w-48 lg:flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-slate-400"
          />
          <Input
            type="text"
            name="q"
            defaultValue={defaultQuery}
            placeholder={searchPlaceholder}
            className={`${ADMIN_FIELD_CLASS} h-9 pl-10`}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
          {children}
          <Button
            type="submit"
            variant="outline"
            className={`h-9 w-full shrink-0 sm:w-auto ${ADMIN_BUTTON_OUTLINE_CLASS}`}
          >
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
}

interface AdminStatusFilterProps {
  readonly name?: string;
  readonly defaultValue?: string;
}

export function AdminStatusFilter({ name = "status", defaultValue = "" }: AdminStatusFilterProps) {
  return (
    <AdminFormSelect
      name={name}
      defaultValue={defaultValue}
      options={[
        { value: "", label: "All Statuses" },
        { value: "DRAFT", label: "Draft" },
        { value: "PUBLISHED", label: "Published" },
      ]}
      placeholder="All statuses"
      className={ADMIN_FILTER_SELECT_CLASS}
      triggerClassName="w-full"
    />
  );
}

interface AdminBlogTypeFilterProps {
  readonly defaultValue?: string;
}

export function AdminBlogTypeFilter({ defaultValue = "" }: AdminBlogTypeFilterProps) {
  return (
    <AdminFormSelect
      name="type"
      defaultValue={defaultValue}
      options={[
        { value: "", label: "All Types" },
        { value: "GENERAL", label: "General" },
        { value: "SERVICE", label: "Service" },
        { value: "PRODUCT", label: "Product" },
      ]}
      placeholder="All types"
      className={ADMIN_FILTER_SELECT_CLASS}
      triggerClassName="w-full"
    />
  );
}
