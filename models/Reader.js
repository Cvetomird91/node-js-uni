import mongoose from "mongoose";
const { Schema } = mongoose;

const ReaderSchema = new Schema ({
    firstName: String,
    lastName: String,
    status: Number
});

const Reader = mongoose.model("Reader", ReaderSchema);
export default Reader;