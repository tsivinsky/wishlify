import { NextMiddleware, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const authRoutes = ["/login", "/join"];

const handler: NextMiddleware = (req, event) => {
  if (
    !req.cookies.has("sessionid") &&
    !authRoutes.includes(req.nextUrl.pathname)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    req.cookies.has("sessionid") &&
    authRoutes.includes(req.nextUrl.pathname)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export default handler;
