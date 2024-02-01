import * as React from "react"
import type { SVGProps } from "react";
const SvgFB = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 40 40"
    {...props} 
  >
    <path
      fill="#000000"
      d="M20 0C8.974 0 0 8.974 0 20s8.974 20 20 20 20-8.974 20-20S31.026 0 20 0Zm0 3.333A16.641 16.641 0 0 1 36.667 20c0 8.379-6.148 15.269-14.187 16.465V24.86h4.747l.745-4.82H22.48v-2.634c0-2.002.658-3.78 2.53-3.78h3.008V9.421c-.529-.072-1.647-.228-3.76-.228-4.413 0-6.999 2.33-6.999 7.64v3.206h-4.538v4.821h4.538v11.563C9.35 35.117 3.333 28.288 3.333 20A16.641 16.641 0 0 1 20 3.333Z"
    />
  </svg>
)
export default SvgFB
