import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
// import { createGuest } from "@/lib/apiService";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.image = user.image ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
        session.user.image = token.image ?? null;
      }
      return session;
    },

    async signIn() {
      // if (!user?.email || !user?.name) {
      //   console.error("SignIn callback: missing user info");
      //   return false;
      // }

      // const guestData = {
      //   name: user.name,
      //   email: user.email,
      // };

      // try {
      //   await createGuest(guestData);
        return true;
      // } catch (err) {
      //   console.error("SignIn callback error:", err);
      //   return false;
      // }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
