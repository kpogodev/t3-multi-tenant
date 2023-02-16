import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env/server.mjs";
import { prisma } from "./db";

// const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/

export type UserRole = "ADMIN" | "DEV" | "TENANT";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: UserRole;
    site: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.name,
        role: user.role,
      },

    }),
    redirect: async ({url}) => {
      return Promise.resolve(url)
    },
  },
  pages: {
    signIn: `/auth/sign-in`,
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
