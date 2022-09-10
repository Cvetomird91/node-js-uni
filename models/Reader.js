import mongoose from "mongoose";
const { Schema } = mongoose;

const ReaderSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    status: Number
});

const Reader = mongoose.model("Reader", ReaderSchema);
export default Reader;