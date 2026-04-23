import * as React from "react";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { cn } from "@/lib/utils";
function Kbd({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("kbd", _extends({
    "data-slot": "kbd",
    className: cn("bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none", "[&_svg:not([class*='size-'])]:size-3", "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10", className)
  }, props));
}
function KbdGroup({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement("kbd", _extends({
    "data-slot": "kbd-group",
    className: cn("inline-flex items-center gap-1", className)
  }, props));
}
export { Kbd, KbdGroup };