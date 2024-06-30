import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

interface ExtendedSessionUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  image?: string;
}


export const authConfig: AuthOptions = {
  providers: [
    // Провайдер Google для аутентификации через Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Провайдер Credentials для аутентификации по электронной почте и паролю
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: { email: string, password: string }) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return Promise.resolve(true);
      }

      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (userExists) {
            return Promise.resolve(true);
          }

          if (!userExists) {
            const res = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                image,
              }),
            });

            if (res.ok) {
              return Promise.resolve(user.id);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return Promise.resolve(false);
    },

    async session({ session, token }): Promise<any> {
      await connectMongoDB();
      const user = await User.findOne({ email: token.email });

      if (user) {
        // Приведение к типу ExtendedSessionUser
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthday: user.birthday,
          image: user.image,
        } as ExtendedSessionUser;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
