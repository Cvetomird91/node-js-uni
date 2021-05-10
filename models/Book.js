import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema ({
    title: String,
    ISBN: String,
    date: Date,
    cover: String,
    author: String,
});

const Book = mongoose.model("Book", BookSchema);
export default Book;