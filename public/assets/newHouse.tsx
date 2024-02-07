import * as React from "react"
import type { SVGProps } from "react";
const SvgNewHouse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15 19.4 1.714 1.6L21 17m-9-5v4m2-2h-4M5 9.778V16.2c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C7.28 21 8.12 21 9.8 21H11m10-9-5.433-6.036c-1.236-1.373-1.854-2.06-2.581-2.312a3 3 0 0 0-1.974 0c-.728.253-1.345.94-2.58 2.313L3 12"
    />
  </svg>
)
export default SvgNewHouse
