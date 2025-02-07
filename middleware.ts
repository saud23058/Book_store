import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyToken } from "./app/lib/token";


const protectedRoutes = ["/book", "/create-book*", "/order-list*","/place-order*"]; 

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  
  if (protectedRoutes.includes(pathname)) {
    
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
     
      return NextResponse.redirect(new URL("/signup", req.url));
    }

    try {
      
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        throw new Error("Invalid token");
      }

      
      return NextResponse.next();
    } catch {
    
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  
  return NextResponse.next();
}