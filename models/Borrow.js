import mongoose from "mongoose";
const { Schema } = mongoose;

const BorrowSchema = new Schema ({
    bookCopy: {
        type: Schema.Types.ObjectId,
        ref: 'BookCopy',
        required: true
    },
    //todo: check if we can remove this relation safely and make sure it's redudant
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    readerId: {
        type: Schema.Types.ObjectId,
        ref: 'Reader',
        required: true
    },
    dateFrom: Date,
    dateTo: Date,
    status: Number
});

const Borrow = mongoose.model("Borrow", BorrowSchema);
export default Borrow;