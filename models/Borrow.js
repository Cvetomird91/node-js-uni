import mongoose from "mongoose";
const { Schema } = mongoose;

const BorrowSchema = new Schema ({
    bookCopyId: String,
    readerId: String,
    dateFrom: String,
    dateTo: String,
    status: Number
});

const Borrow = mongoose.model("Borrow", BorrowSchema);
export default Borrow;