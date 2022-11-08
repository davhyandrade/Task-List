import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';

const SECRET: any = process.env.SECRET;

export function middleware(request: NextRequest) {
  const { token } = parseCookies();

  const { pathname, origin } = request.nextUrl;
  if (request.nextUrl.pathname.startsWith('/login')) {
    // try {
    //   jwt.verify(token, SECRET); // <---- ERROR COMES FROM HERE
    //   return NextResponse.next();
    // } catch (error) {
    //     const url = request.nextUrl.clone()
    //     url.pathname = '/'
    //     return NextResponse.rewrite(url)
    // }
  // }
  // if (token) {
  //   // Respond with JSON indicating an error message
  // } else {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.rewrite(url)

  }

  // if (request.nextUrl.pathname.startsWith('/login')) {
  //   console.log('page login');
  //   if (token) {
  //     try {
  //       jwt.verify(token, SECRET);

  //       console.log('foiis');

  //       return NextResponse.redirect('/');
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }

  // if (request.url.includes('/register')) {
  //   console.log('page register');

  //   if (token) {
  //     try {
  //       jwt.verify(token, SECRET);
  //       console.log('foiis');

  //       return NextResponse.redirect('/');
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }

  // if (!token) {
  //   return NextResponse.json({ msg: 'Acesso negado!' });
  // }

  // if(!token) {
  //   // jwt.verify(token, SECRET);
  
  //   // return NextResponse.next();

  //   NextResponse.json({ msg: 'Token inválido!' });
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/login'
  //   return NextResponse.rewrite(url)
  // } else {

  // }

}
