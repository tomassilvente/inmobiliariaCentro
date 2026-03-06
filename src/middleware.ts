import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/miscasas",
    "/api/users/:id*",
    "/api/pagos",
    "/api/users",
    "/api/casas/:id*",
    "/alquileres",
    "/venta",
    "/casa/:id*",
    "/about",
    "/registro",
    "/logearse",
    "/api/casacliente",
    "/api/(.*)"
  ],

  ignoredRoutes: [
    "/__webpack_hmr"
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};