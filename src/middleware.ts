import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ["/",'/api', '/miscasas', '/api/users/:id*', '/api/pagos' , '/api/users' , '/api/casas/:id*' ,'/alquileres', '/venta', '/casa/:id*','/about','/registro','/logearse','/api/casacliente']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  
};