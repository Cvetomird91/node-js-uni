import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import { UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (root, {email, password}, context) => {
            console.log(context);

            if (!context.authSuccessful) {
                throw(context.error);
            }
            const user = await User.find({email});

            if (!user) {
                throw new UserInputError(`cannot find user with email: ${email}`, {
                    field: "email",
                    value: email,
                    constraint: "emailDoesNotExist",
                })
            }

            const validPassword = await bcryptjs.compare(password, user[0].password);
            if(!validPassword){
                throw new UserInputError(`Password is incorrect`, {
                    field: "password",
                    value: "",
                    constraint: "passwordIncorrect",
                })
            }

            user[0].logged = true;
            await user[0].save();

            const token = jwt.sign({
                email: email, 
            }, process.env.JWT_TOKEN_SECRET, {
                expiresIn: "1d"
            });

            return token;
        },
        logout: async(root, {email}) => {
            const user = await User.find({email: email});
            user[0].logged = false;
            await user[0].save();
            return 'logout';
        }
    }
}