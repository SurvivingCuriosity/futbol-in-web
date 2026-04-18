"use client";

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type Placement,
  FloatingPortal,
} from "@floating-ui/react";
import { type ReactNode, useEffect, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  /** Placement preference — the tooltip flips automatically if there's no space */
  placement?: Placement;
  /** Delay in ms before showing/hiding the tooltip */
  delay?: number | { open?: number; close?: number };
  /** Disable the tooltip entirely */
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = { open: 300, close: 100 },
  disabled = false,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context, update, elements } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      offset(8),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
    ],
  });

  const { setReference, setFloating } = refs;

  // autoUpdate must run in an effect — reading refs during render throws in React 19
  useEffect(() => {
    if (!open || !elements.reference || !elements.floating) return;
    return autoUpdate(elements.reference, elements.floating, update);
  }, [open, elements.reference, elements.floating, update]);

  const hover = useHover(context, { move: false, delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  if (disabled) return <>{children}</>;

  return (
    <>
      <span ref={setReference} {...getReferenceProps()} className="w-fit z-2000 relative">
        {children}
      </span>

      {open && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={{ ...floatingStyles, zIndex: 9999 }}
            data-state="open"
            data-placement={context.placement}
            {...getFloatingProps()}
          >
            {typeof content === "string" ? (
              <div className="rounded-md bg-neutral-800 border border-neutral-600 px-2.5 py-1.5 text-xs text-white shadow-md">
                {content}
              </div>
            ) : (
              content
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
