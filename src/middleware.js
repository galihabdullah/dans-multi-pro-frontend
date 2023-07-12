import {getCookie} from "cookies-next";
import { NextResponse, NextRequest } from 'next/server'

export function middleware(req){
    const cookie = req.cookies.get('dans_auth')
    if (!req.nextUrl.pathname.startsWith('/login') && !cookie) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        console.log(req.url)
        return NextResponse.redirect(url, req.url);
    }else if(req.nextUrl.pathname.startsWith('/login') && cookie){
        const url = req.nextUrl.clone();
        url.pathname = "/";
        console.log(req.url)
        return NextResponse.redirect(url, req.url);
    }

    // return NextResponse.next()

}


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
