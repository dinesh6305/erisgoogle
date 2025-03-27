"use client";

import React, { forwardRef } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

const SheetContent = forwardRef(({ className, children, side = "right", ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
    <SheetPrimitive.Content
      ref={ref}
      className={clsx(
        "fixed top-0 h-full w-80 bg-white p-6 shadow-lg transition-transform",
        {
          "right-0 translate-x-0": side === "right",
          "left-0 -translate-x-full": side === "left",
        },
        className
      )}
      {...props}
    >
      <SheetClose className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black">
        <X className="h-6 w-6" />
      </SheetClose>
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));

const SheetHeader = ({ children }) => (
  <div className="mb-4 border-b pb-4">{children}</div>
);

const SheetTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
