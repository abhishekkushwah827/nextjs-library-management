import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string,
      email?:String,
      role?:String,
      userId?:number
    },
  }

  interface User {
    name?: string,
    email?:String,
    role?:String,
    userId?:number
}
}


import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string,
    role?:String,
    userId?:number,
  }
}


