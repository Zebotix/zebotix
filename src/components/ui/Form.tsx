'use client';
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

import { Label } from "./Label"

import { cn } from "@/lib/utils"

const Form = FormProvider
const FormField = Controller

export { Form, FormField }
