import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: 'pintukonser',
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },

            },
            async authorize(credentials) {
                console.log(credentials);
                const { email, password } = credentials

                // ambil dari db
                if (email === 'tes1@gmail.com' && password === '12341234') {
                    return {
                        id: 1,
                        name: 'tes',
                        email: 'tes1@gmail.com',
                        role: 'SELLER'
                    }
                } else {
                    return null
                }
            },
        })
    ],
    // setelah authorize akan menjalankan ini
    callbacks: {
        async jwt({ token, account, profile, user }) {
            console.log(token);
            if (account?.provider === 'credentials') {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log(session);
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }
            return session;

        }
    },
    pages: {
        signIn: '/auth/login'
    }
})

export { handler as GET, handler as POST }