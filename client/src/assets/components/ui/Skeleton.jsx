"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

const Skeleton = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "bg-gray-300 animate-pulse rounded-md",
      className
    )}
    {...props}
  />
));

export { Skeleton };
