import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


// cara 1
// export default withAuth(
//     function middleware(req) {
//         // return NextResponse
//         return NextResponse.rewrite(new URL("/dashboard", req.url));
//     },
//     {
//         callbacks: {
//             authorized({ token }) {
//                 return token?.role === "SELLER";
//             },
//         },
//     }
// );

// export const config = { matcher: ["/dashboard/:path*"] };



// cara 2

// export default withAuth(
//     function middleware(req) {
//         const { url } = req;
//         if (url.startsWith("/acara")) {
//             return handleaAcaraPath(url);
//         } else if (url.startsWith("/dashboard")) {
//             return handleDashboardPath(url);
//         }
//         return NextResponse.next();
//     },
//     {
//         callbacks: {
//             authorized({ token, req }) {
//                 // Pastikan ada autentikasi dan token role admin untuk akses
//                 return token && token.role === "SELLER";
//             },
//         },
//     }
// );

// function handleaAcaraPath(url) {
//     return NextResponse.rewrite(new URL(`/acara${url.slice("/acara".length)}`, url));
// }

// function handleDashboardPath(url) {
//     return NextResponse.rewrite(new URL(`/dashboard${url.slice("/dashboard".length)}`, url));
// }

// export const config = {
//     matcher: ['/acara/:path*', '/dashboard/:path*'],
// };


//cara 3

// export default withAuth(
//     function middleware(req) {
//         const { url } = req;
//         console.log(req);
//         // Dapatkan token dari permintaan
//         const token = req.cookies.get('token');

//         // Periksa jalur URL dan token
//         if (url.startsWith("/acara") || url.startsWith("/dashboard")) {
//             if (token && token.role === "SELLER") {
//                 if (url.startsWith("/acara")) {
//                     return handleaAcaraPath(url);
//                 } else if (url.startsWith("/dashboard")) {
//                     return handleDashboardPath(url);
//                 }
//             } else {
//                 return NextResponse.redirect(new URL('/login', req.url)); // Redirect ke halaman login jika tidak authorized
//             }
//         } else if (url.startsWith("/home")) {
//             if (token && token.role === "CUSTOMER") {
//                 return handleHomePath(url);
//             } else {
//                 return NextResponse.redirect(new URL('/login', req.url)); // Redirect ke halaman login jika tidak authorized
//             }
//         }

//         return NextResponse.next();
//     },
//     {
//         callbacks: {
//             authorized({ token }) {
//                 // Pastikan ada autentikasi dan token role admin atau customer untuk akses
//                 return token && (token.role === "SELLER" || token.role === "CUSTOMER");
//             },
//         },
//     }
// );

// function handleaAcaraPath(url) {
//     return NextResponse.rewrite(new URL(`/acara${url.slice("/acara".length)}`, url));
// }

// function handleDashboardPath(url) {
//     return NextResponse.rewrite(new URL(`/dashboard${url.slice("/dashboard".length)}`, url));
// }

// function handleHomePath(url) {
//     return NextResponse.rewrite(new URL(`/home${url.slice("/home".length)}`, url));
// }

// export const config = {
//     matcher: ['/acara/:path*', '/dashboard/:path*', '/home/:path*'],
// };



// cara 4


export default withAuth(
    function middleware(req) {
        const url = req.nextUrl;
        const token = req.nextauth.token;

        // console.log(url.pathname);
        // console.log(token);

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // untuk auth tapi belum jalan
        // if (url.pathname.startsWith("/auth/login")) {
        //     if (token.role === "CUSTOMER") {
        //         return NextResponse.redirect(new URL('/home', req.url));
        //     } else if (token.role === "SELLER") {
        //         return NextResponse.rewrite(new URL(`/dashboard${url.pathname.slice("/dashboard".length)}`, url));
        //     }
        // }
        // if (url.pathname.startsWith("/auth/register")) {

        //     if (token.role === "CUSTOMER") {
        //         return NextResponse.redirect(new URL('/home', req.url));
        //     } else if (token.role === "SELLER") {
        //         return NextResponse.rewrite(new URL(`/dashboard${url.pathname.slice("/dashboard".length)}`, url));
        //     }
        // }



        // untuk seller
        if (url.pathname.startsWith("/acara")) {
            if (token.role === "CUSTOMER") {
                return NextResponse.redirect(new URL('/home', req.url));
            } else if (token.role === "SELLER") {
                return NextResponse.rewrite(new URL(`/acara${url.pathname.slice("/acara".length)}`, url));
            }
        }
        if (url.pathname.startsWith("/dashboard")) {
            if (token.role === "CUSTOMER") {
                return NextResponse.redirect(new URL('/home', req.url));
            } else if (token.role === "SELLER") {
                return NextResponse.rewrite(new URL(`/dashboard${url.pathname.slice("/dashboard".length)}`, url));
            }
        }
        if (url.pathname.startsWith("/detail_acara")) {
            if (token.role === "CUSTOMER") {
                return NextResponse.redirect(new URL('/home', req.url));
            } else if (token.role === "SELLER") {
                return NextResponse.rewrite(new URL(`/detail_acara${url.pathname.slice("/detail_acara".length)}`, url));
            }
        }
        if (url.pathname.startsWith("/tiket")) {
            if (token.role === "CUSTOMER") {
                return NextResponse.redirect(new URL('/home', req.url));
            } else if (token.role === "SELLER") {
                return NextResponse.rewrite(new URL(`/tiket${url.pathname.slice("/tiket".length)}`, url));
            }
        }






        // untuk customer
        if (url.pathname.startsWith("/home")) {
            if (token.role === "CUSTOMER") {
                return NextResponse.rewrite(new URL(`/home${url.pathname.slice("/home".length)}`, url));
            } else if (token.role === "SELLER") {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
        }

        // Redirect ke halaman login jika pengguna tidak belum login
        return NextResponse.redirect(new URL('/login', req.url));
    },
    {
        callbacks: {
            authorized({ token }) {
                // Pastikan ada autentikasi dan token role seller atau customer untuk akses
                return token && (token.role === "SELLER" || token.role === "CUSTOMER");
            },
        },
    }
);


// halaman yang di tentukan harus login
export const config = {
    matcher: [
        '/acara/:path*',
        '/dashboard/:path*',
        '/home/:path*',
        '/detail_acara/:path*',
        '/tiket/:path*',
    ],
};


// cara 5


// export default withAuth(
//     function middleware(req) {
//         const url = req.nextUrl;
//         const token = req.nextauth.token;

//         console.log(url.pathname);
//         console.log(token);

//         // Logika untuk halaman login dan register
//         if (url.pathname.startsWith("/auth/login") || url.pathname.startsWith("/auth/register")) {
//             // Jika pengguna belum login, izinkan akses ke /auth/login dan /auth/register
//             if (!token) {
//                 return NextResponse.next();
//             }
//             // Jika pengguna sudah login, arahkan berdasarkan peran
//             if (token.role === "CUSTOMER") {
//                 return NextResponse.redirect(new URL('/home', req.url));
//             } else if (token.role === "SELLER") {
//                 return NextResponse.redirect(new URL('/dashboard', req.url));
//             }
//         }

//         // Logika untuk halaman acara dan dashboard
//         if (url.pathname.startsWith("/acara") && token.role === "SELLER") {
//             return NextResponse.rewrite(new URL(`/acara${url.pathname.slice("/acara".length)}`, url));
//         }

//         if (url.pathname.startsWith("/dashboard") && token.role === "SELLER") {
//             return NextResponse.rewrite(new URL(`/dashboard${url.pathname.slice("/dashboard".length)}`, url));
//         }

//         if (url.pathname.startsWith("/home")) {
//             if (token.role === "CUSTOMER") {
//                 return NextResponse.rewrite(new URL(`/home${url.pathname.slice("/home".length)}`, url));
//             } else if (token.role === "SELLER") {
//                 return NextResponse.redirect(new URL('/dashboard', req.url));
//             }
//         }

//         // Redirect ke halaman login jika pengguna tidak terotorisasi
//         if (!token) {
//             return NextResponse.redirect(new URL('/login', req.url));
//         }

//         return NextResponse.next();
//     },
//     {
//         callbacks: {
//             authorized({ token }) {
//                 // Pastikan ada autentikasi dan token role seller atau customer untuk akses
//                 return token && (token.role === "SELLER" || token.role === "CUSTOMER");
//             },
//         },
//     }
// );

// export const config = {
//     matcher: [
//         '/acara/:path*',
//         '/dashboard/:path*',
//         '/home/:path*',
//         '/detail_acara/:path*',
//         '/tiket/:path*',
//         '/auth/login',
//         '/auth/register'
//     ],
// };


