import * as React from "react"
import type { SVGProps } from "react";
const SvgHouseList = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 7.5V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C11.52 3 12.08 3 13.2 3h4.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v11.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H16M14 7h3m-3 4h3M3 16l4.424-4.022c.38-.345.57-.518.785-.583a1 1 0 0 1 .582 0c.215.065.405.238.785.583L14 16m-9-1.818V19.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C5.76 21 6.04 21 6.6 21h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C12 20.24 12 19.96 12 19.4v-5.218"
    />
  </svg>
)
export default SvgHouseList