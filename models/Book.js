import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    ISBN: {
        unique: true,
        type: String,
        required: true
    },
    date: Date,
    cover: String,
    author: {
        type: String,
        required: true
    },
    copies: [{
        type: Schema.Types.ObjectId,
        ref: 'BookCopy' 
    }],
    numberOfCopies: Number,
});

const Book = mongoose.model("Book", BookSchema);
export default Book;