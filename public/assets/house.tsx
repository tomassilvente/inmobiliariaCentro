import * as React from "react"
import type { SVGProps } from "react";
const SvgHouse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    data-name="home screen"
    viewBox="0 0 24 24"
    {...props}
  >
    <g data-name="24x24/clip--dark">
      <path fill="none" d="M0 0h24v24H0z" data-name="Mask" />
    </g>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M19 11v10H5V11"
      data-name="Rectangle 12"
    />
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M2.1 14 12 4.101l9.9 9.9"
      data-name="Rectangle 12"
    />
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10 15h4v6h-4z"
      data-name="Rectangle 13"
    />
  </svg>
)
export default SvgHouse
