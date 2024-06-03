import GoogleProvider from "next-auth/providers/google";
import connectDB from "../config/database";
import User from "../models/User";

type Profile = {
  email: string;
  name: string;
  picture: string;
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }: { profile: Profile }) {
      // 1. connect to database
      await connectDB();
      // 2. check if your exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. If not, then add user to DB
      if (!userExists) {
        // Truncate username if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }

      // return true to allow signin
      return true;
    },
    async session({ session }) {
      // 1. Connect DB
      await connectDB();
      // 2. Get User from DB
      const user = await User.findOne({ email: session.user.email });
      // 3. Assign the user id to the session
      session.user.id = user._id.toString();
      // 4. Return session
      return session;
    },
  },
};
