import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

interface AdminFormMessageProps {
  readonly message: string;
  readonly title?: string;
}

export function AdminFormMessage({
  message,
  title = "Something went wrong",
}: AdminFormMessageProps) {
  return (
    <Alert variant="destructive" className="border-red-500/20 bg-red-500/10 text-red-300">
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
