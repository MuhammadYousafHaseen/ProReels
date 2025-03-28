import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next(); // return NextResponse.redirect(new URL("/login", request.url));
    },
    {
        callbacks: {
            authorized: async ({ token, req}) => {
                const { pathname } = req.nextUrl;

                // Allow auth-related URLs
                if (
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register"
                ) {
                    return true;
                }

                // Public routes
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true;
                }

                return !!token;
            }
        }
    }
);

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
