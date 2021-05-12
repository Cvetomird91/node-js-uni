import Borrow from "../../models/Borrow.js";
import Book from "../../models/Book.js";
import BookCopy from "../../models/BookCopy.js";
import Reader from "../../models/Reader.js";

export default {
    Mutation: {
        borrowBook: async (root, args) => {

            //to do: check if book copy exists, if book copy is available and if reader exits and active

            const dateFrom = new Date(args.data.dateFrom);
            const dateTo = new Date(args.data.dateTo);

            const newBorrow = new Borrow({bookCopy: args.data.bookCopyId,
                                          readerId: args.data.readerId,
                                          dateFrom: new Date(dateFrom),
                                          dateTo: new Date(dateTo)});
            await newBorrow.save();

            //populate the reader and book date to be returned on the front-end
            const bookCopy = await BookCopy.findById(args.data.bookCopyId).populate("bookId");
            newBorrow.reader = await Reader.findById(args.data.readerId);
            newBorrow.book = bookCopy.bookId;

            return newBorrow;
        }
    }
}