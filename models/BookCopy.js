import mongoose from "mongoose";
const { Schema } = mongoose;

const BookCopySchema = new Schema ({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: Number,
});

const BookCopy = mongoose.model("BookCopy", BookCopySchema);
export default BookCopy;