import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongodb from "@/database/connMongodb";
import Users from "@/model/RegisterUserSchema";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongodb().catch(error => { error: "Connection failed with database!" });

        const result = await Users.findOne({ email: credentials.email })

        if (!result) {
          throw new Error("No user found with email. Please Sign Up!")
        }

        const checkPassword = await compare(credentials.password, result.password);

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Password doesn't match");
        }

        return result;
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
}
};

export default NextAuth(authOptions);
