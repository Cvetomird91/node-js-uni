import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema ({
    email: {
        unique: true,
        type: String,
    },
    password: { 
        type: String, 
        min: 6, 
        max: 255 
    },
    logged: Boolean,
});

const User = mongoose.model("User", UserSchema);
export default User;