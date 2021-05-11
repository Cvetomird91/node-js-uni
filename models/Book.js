import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema ({
    title: String,
    ISBN: {
        unique: true,
        type: String,
    },
    date: Date,
    cover: String,
    author: String,
    copies: [{
        type: Schema.Types.ObjectId,
        ref: 'BookCopy' 
    }],
    numberOfCopies: Number,
});

const Book = mongoose.model("Book", BookSchema);
export default Book;