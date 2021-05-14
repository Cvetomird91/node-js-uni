import User from "../models/User.js"
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export const verifyToken = async (token) => {

      const parsedToken = token.replace("Bearer ", "");
      try {
        const decryptedLoginData = jwt.verify(parsedToken, process.env.JWT_TOKEN_SECRET);

        const user = await User.find({email: decryptedLoginData.email});
        delete user.password;
        const currentTimestamp = (new Date())/1000;

        if (!user[0].logged || !user[0] || currentTimestamp > decryptedLoginData.exp) {
            return {authSuccessful: false, error: new AuthenticationError('must authenticate')};
        }

        return {authSuccessful: true, ...decryptedLoginData};
      } catch (e) {
        return {authSuccessful: false, error: e};
      }

}