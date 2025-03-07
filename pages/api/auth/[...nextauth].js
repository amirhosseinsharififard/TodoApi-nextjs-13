import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { verifyPassword } from "../../../utils/auth";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [ // 🔹 اینجا `providers` باید با "s" باشد
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
console.log(credentials)
        try {
          await connectDB();
          console.log("Connected to DB");
        } catch (err) {
          throw new Error("Error in connecting to DB");
        }

        if (!email || !password) throw new Error("Invalid data!");

        const user = await User.findOne({ email });

        if (!user) throw new Error("User doesn't exist");

        const isInvalid = await verifyPassword(password, user.password);

        if (!isInvalid) throw new Error("Username or password is incorrect");

        return { email };
      },
    }),
  ], // 🔹 اینجا باید یک آرایه باشد
};

export default NextAuth(authOptions);
