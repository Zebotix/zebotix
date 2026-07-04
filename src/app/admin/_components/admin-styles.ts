/** Shared class names for admin form controls (theme-adaptive). */
export const ADMIN_FIELD_CLASS =
  "w-full border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20";

export const ADMIN_SELECT_TRIGGER_CLASS = `${ADMIN_FIELD_CLASS} w-full min-w-0`;

/** Fixed-width select wrapper used in list filter bars. */
export const ADMIN_FILTER_SELECT_CLASS = "w-full shrink-0 sm:w-44";

export const ADMIN_BUTTON_OUTLINE_CLASS =
  "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground";

export const ADMIN_TABLE_CELL_MUTED = "text-muted-foreground";

export const ADMIN_TABLE_HEAD_CLASS = "font-semibold text-foreground";

export const ADMIN_TABLE_ROW_CLASS = "border-border hover:bg-muted/50";

export const ADMIN_TABLE_HEADER_ROW_CLASS = "border-border bg-muted";

export const ADMIN_EMPTY_STATE_CLASS = "text-muted-foreground";

export const ADMIN_DROPDOWN_CONTENT_CLASS =
  "border-border bg-popover text-popover-foreground shadow-xl";

export const ADMIN_ALERT_DIALOG_CLASS =
  "border border-border bg-background text-foreground shadow-xl";

export const ADMIN_BADGE_PUBLISHED_CLASS =
  "border-emerald-500/35 bg-emerald-500/15 text-emerald-600 dark:text-emerald-200";

export const ADMIN_BADGE_DRAFT_CLASS =
  "border-muted-foreground/35 bg-muted-foreground/15 text-muted-foreground";

export const ADMIN_BADGE_SECONDARY_CLASS =
  "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-200";

export const POST_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
] as const;

export const POST_STATUS_FILTER_OPTIONS = [
  { value: "", label: "All Statuses" },
  ...POST_STATUS_OPTIONS,
] as const;

export const LINK_TYPE_OPTIONS = [
  { value: "GENERAL", label: "General" },
  { value: "SERVICE", label: "Service" },
  { value: "PRODUCT", label: "Product" },
] as const;

export const BLOG_TYPE_FILTER_OPTIONS = [
  { value: "", label: "All Types" },
  ...LINK_TYPE_OPTIONS,
] as const;

export function adminStatusBadgeClass(status: string): string {
  return status === "PUBLISHED" ? ADMIN_BADGE_PUBLISHED_CLASS : ADMIN_BADGE_DRAFT_CLASS;
}
