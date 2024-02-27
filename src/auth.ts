import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GitHub from "next-auth/providers/github";

export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
	providers: [GitHub],
});
