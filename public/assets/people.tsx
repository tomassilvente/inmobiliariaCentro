import * as React from "react"
import type { SVGProps } from "react";
const SvgPeople = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" data-name="24x24/user--dark" />
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M6 20.106c0-3.783 4.5-3.026 4.5-4.539a2.237 2.237 0 0 0-.41-1.513A3.5 3.5 0 0 1 9 11.4 3.222 3.222 0 0 1 12 8a3.222 3.222 0 0 1 3 3.4 3.44 3.44 0 0 1-1.105 2.653 2.333 2.333 0 0 0-.395 1.514c0 1.513 4.5.757 4.5 4.54 0 0-1.195.894-6 .894s-6-.895-6-.895ZM5.486 15.967a23.453 23.453 0 0 1-1.512-.114A6.835 6.835 0 0 1 1 15.106c0-3.783 4.5-3.026 4.5-4.539a2.237 2.237 0 0 0-.41-1.513A3.5 3.5 0 0 1 4 6.4 3.222 3.222 0 0 1 7 3a3.222 3.222 0 0 1 3 3.4M18.514 15.967a23.453 23.453 0 0 0 1.512-.114A6.835 6.835 0 0 0 23 15.106c0-3.783-4.5-3.026-4.5-4.539a2.237 2.237 0 0 1 .41-1.513A3.5 3.5 0 0 0 20 6.4 3.222 3.222 0 0 0 17 3a3.222 3.222 0 0 0-3 3.4"
      data-name="Combined Shape"
    />
  </svg>
)
export default SvgPeople
