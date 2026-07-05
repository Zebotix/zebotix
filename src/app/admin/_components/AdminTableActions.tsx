"use client";

import { Edit, MoreHorizontal, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { ADMIN_ALERT_DIALOG_CLASS, ADMIN_DROPDOWN_CONTENT_CLASS } from "./admin-styles";

export type ActionState = { success: boolean; message?: string; errors?: Record<string, string[]> };

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";


export interface AdminDeleteConfig {
  readonly id: number;
  readonly entityName: string;
  readonly action: (id: number) => Promise<ActionState>;
}

interface AdminTableActionsProps {
  readonly editHref: string;
  readonly editLabel?: string;
  readonly deleteConfig?: AdminDeleteConfig;
  readonly togglePublishConfig?: {
    id: number;
    action: (id: number) => Promise<ActionState>;
    entityName: string;
    currentValue: boolean;
  };
}

export function AdminTableActions({
  editHref,
  editLabel,
  deleteConfig,
  togglePublishConfig,
}: AdminTableActionsProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelete = () => {
    if (!deleteConfig) {
      return;
    }

    startTransition(async () => {
      const result = await deleteConfig.action(deleteConfig.id);

      if (result.success) {
        toast.success(result.message ?? "Deleted successfully");
        setConfirmOpen(false);
        router.refresh();
        return;
      }

      toast.error(result.message ?? "Failed to delete");
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <MoreHorizontal />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={`min-w-40 ${ADMIN_DROPDOWN_CONTENT_CLASS}`}>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={editHref}>
                {editLabel === "View" ? <Eye /> : <Edit />}
                {editLabel || "Edit"}
              </Link>
            </DropdownMenuItem>
            {deleteConfig ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                  onClick={() => setConfirmOpen(true)}
                  disabled={isPending}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </>
            ) : null}
            {togglePublishConfig ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    startTransition(async () => {
                      const result = await togglePublishConfig.action(togglePublishConfig.id);

                      if (result.success) {
                        toast.success(result.message ?? "Action performed successfully");
                        router.refresh();
                        return;
                      }

                      toast.error(result.message ?? "Action failed");
                    });
                  }}
                  disabled={isPending}
                >
                  {togglePublishConfig.currentValue === true ? (
                    <>
                      <EyeOff />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <Eye />
                      Publish
                    </>
                  )}
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {deleteConfig ? (
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className={ADMIN_ALERT_DIALOG_CLASS}>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">Delete item?</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  &ldquo;{deleteConfig.entityName}&rdquo;
                </span>{" "}
                will be permanently removed. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                disabled={isPending}
                onClick={handleConfirmDelete}
              >
                {isPending ? "Deleting…" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
}
