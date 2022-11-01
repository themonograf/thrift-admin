// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getSession } from "next-auth/react";

// export async function middleware(request: NextRequest) {
//   const session = await getSession();
//   console.log(session);
//   return NextResponse.rewrite(new URL("/", request.url));
//   // return null
// }

// // Supports both a single string value or an array of matchers
// export const config = {
//   matcher: ["/home/:path*", "/user-management/:path*"],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = { matcher: ["/home/:path*", "/user-management/:path*"] };
