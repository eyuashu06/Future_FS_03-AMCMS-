import * as React from "react";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
const buttonGroupVariants = cva("flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2", {
  variants: {
    orientation: {
      horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
      vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    "data-slot": "button-group",
    "data-orientation": orientation,
    className: cn(buttonGroupVariants({
      orientation
    }), className)
  }, props));
}
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: cn("bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", className)
  }, props));
}
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /*#__PURE__*/React.createElement(Separator, _extends({
    "data-slot": "button-group-separator",
    orientation: orientation,
    className: cn("bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto", className)
  }, props));
}
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };