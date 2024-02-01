import * as React from "react"
import type { SVGProps } from "react";
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 35 35"
    {...props} 
  >
    <path
      fill="#000000"
      d="m.085 0 13.513 19.305L0 35h3.06l11.906-13.742L24.586 35H35L20.727 14.61 33.384 0h-3.06L19.358 12.656 10.5 0H.085Zm4.501 2.409h4.785L30.499 32.59h-4.785L4.586 2.409Z"
    />
  </svg>
)
export default SvgX
