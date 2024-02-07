import * as React from "react"
import type { SVGProps } from "react";
const SvgPaper = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="-8 0 32 32"
    {...props}
  >
    <title>{"paper"}</title>
    <path d="M13.52 5.72h-7.4c-.36 0-.56.2-.6.24L.24 11.24a.8.8 0 0 0-.24.56V24c0 1.24 1 2.24 2.24 2.24h11.24c1.24 0 2.24-1 2.24-2.24V7.96c.04-1.24-.96-2.24-2.2-2.24zM5.28 8.56v1.8c0 .32-.24.56-.56.56H2.88l2.4-2.36zm8.8 15.48c0 .32-.28.56-.56.56H2.24c-.32 0-.56-.28-.56-.56V12.68h3.04c1.24 0 2.24-1 2.24-2.24V7.4h6.52c.32 0 .56.24.56.56l.04 16.08z" />
  </svg>
)
export default SvgPaper
