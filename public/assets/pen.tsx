import * as React from "react"
import type { SVGProps } from "react";
const SvgPen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    data-name="edit pen icon"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path fill="none" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
    <path fill="none" d="M0 0h24v24H0z" data-name="Mask" />
    <g
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      clipPath="url(#a)"
      data-name="24x24/edit"
    >
      <path
        d="M16.596 3.661a2 2 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.829L9.525 19.218l-5.657 1.414 1.414-5.657Z"
        data-name="Rectangle 4"
      />
      <path strokeLinecap="square" d="m14.829 6.136 3.535 3.536" />
    </g>
  </svg>
)
export default SvgPen
