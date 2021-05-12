import mongoose from "mongoose";
const { Schema } = mongoose;

const BorrowSchema = new Schema ({
    bookCopy: {
        type: Schema.Types.ObjectId,
        ref: 'BookCopy' 
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book' 
    },
    readerId: {
        type: Schema.Types.ObjectId,
        ref: 'Reader' 
    },
    dateFrom: Date,
    dateTo: Date,
    status: Number
});

const Borrow = mongoose.model("Borrow", BorrowSchema);
export default Borrow;