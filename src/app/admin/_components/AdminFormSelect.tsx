"use client";

import { useState } from "react";

import { ADMIN_DROPDOWN_CONTENT_CLASS, ADMIN_SELECT_TRIGGER_CLASS } from "./admin-styles";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";

export type AdminSelectOption = {
  value: string;
  label: string;
};

interface AdminFormSelectProps {
  readonly name: string;
  readonly id?: string;
  readonly defaultValue?: string;
  readonly value?: string;
  readonly onValueChange?: (value: string) => void;
  readonly options: readonly AdminSelectOption[];
  readonly placeholder?: string;
  readonly className?: string;
  readonly triggerClassName?: string;
  readonly disabled?: boolean;
}

export function AdminFormSelect({
  name,
  id,
  defaultValue = "",
  value,
  onValueChange,
  options,
  placeholder = "Select…",
  className,
  triggerClassName,
  disabled,
}: AdminFormSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (value: string) => {
    const resolved = value ?? "";
    if (!isControlled) {
      setInternalValue(resolved);
    }
    onValueChange?.(resolved);
  };

  const selectValue = currentValue === "" ? undefined : currentValue;
  const selectedLabel = options.find((opt) => opt.value === selectValue)?.label;

  return (
    <div className={cn("min-w-0", className)}>
      <input type="hidden" name={name} value={currentValue} readOnly />
      <Select value={selectValue} onValueChange={handleValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={cn(ADMIN_SELECT_TRIGGER_CLASS, "w-full", triggerClassName)}
        >
          {selectedLabel ? (
            <span className="flex flex-1 text-left">{selectedLabel}</span>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className={ADMIN_DROPDOWN_CONTENT_CLASS}>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value || "__empty"} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
