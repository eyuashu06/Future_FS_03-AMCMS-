import * as React from "react";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
function Spinner({
  className,
  ...props
}) {
  return /*#__PURE__*/React.createElement(Loader2Icon, _extends({
    role: "status",
    "aria-label": "Loading",
    className: cn("size-4 animate-spin", className)
  }, props));
}
export { Spinner };