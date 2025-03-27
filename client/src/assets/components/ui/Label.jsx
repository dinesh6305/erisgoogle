"use client";

import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import clsx from "clsx";

const Label = forwardRef(({ className, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={clsx(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
  </LabelPrimitive.Root>
));

const LabelText = ({ children, className }) => (
  <span className={clsx("text-gray-700", className)}>{children}</span>
);

export { Label, LabelText };
