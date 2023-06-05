import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as auth from "@/services/auth";


interface User{
  name:String,
  email:String,
  role:String
}
export default NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (!credentials) {
              throw new Error("No credentials.");
            }
            const { email, password } = credentials;
            return auth.signInCredentials(email, password);
          },
        }),
      ],
      secret: "secret123",

      callbacks: {
        async jwt({ token, user }) {
          /* Step 1: update the token based on the user object */
          // console.log("user in callback api",user);
          if (user) {
            token.role = user.role;
            token.userId = parseInt(user.id);
          }
          return token;
        },
        session({ session, token }) {
          /* Step 2: update the session.user based on the token object */
          if (token && session && session.user) {
            session.user.role = token.role;
            session.user.userId = token.userId;
          }
          // console.log("session in callback api",session)
          return session;
        },
      }
      
});