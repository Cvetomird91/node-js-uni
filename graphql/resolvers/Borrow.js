import Borrow from "../../models/Borrow.js";
import BookCopy from "../../models/BookCopy.js";
import Reader from "../../models/Reader.js";
import { UserInputError } from "apollo-server";

export default {
    Mutation: {
        borrowBook: async (root, args) => {

            //to do: check if book copy exists, if book copy is available and if reader exits and active
            //to do: add mutation to mark a book as returned
            //to do: query a borrow
            //to do: query all borrows

            //check if the book copy is already borrowed
            const bookBorrow = await Borrow.find({bookCopy: args.data.bookCopyId});
            const reader = await Reader.findById(args.data.readerId);

            console.log(reader);

            if (reader.status == 0) {
                throw new UserInputError("The reader is not active! reader id: ${args.data.readerId}");
            }

            if (bookBorrow.length != 0) {
                throw new UserInputError("The book copy is already borrowed! book copy ${args.data.bookCopyId}");
            }

            if (reader == null) {
                throw new UserInputError("The reader id is not valid! reader id: ${args.data.readerId}");
            }

            const dateFrom = new Date(args.data.dateFrom);
            const dateTo = new Date(args.data.dateTo);

            const newBorrow = new Borrow({bookCopy: args.data.bookCopyId,
                                          readerId: args.data.readerId,
                                          dateFrom: new Date(dateFrom),
                                          dateTo: new Date(dateTo),
                                          status: 1});
            await newBorrow.save();

            //populate the reader and book date to be returned on the front-end
            const bookCopy = await BookCopy.findById(args.data.bookCopyId).populate("bookId");
            newBorrow.reader = reader;
            newBorrow.book = bookCopy.bookId;

            return newBorrow;
        }
    }
}