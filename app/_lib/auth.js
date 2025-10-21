import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    authorized({auth, request}){
        return !!auth?.user;
    }
  },
  pages:{
    signIn: '/login',
    
  }
};

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(authConfig)