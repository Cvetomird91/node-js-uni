import Borrow from "../../models/Borrow.js";
import BookCopy from "../../models/BookCopy.js";
import Reader from "../../models/Reader.js";
import { UserInputError } from "apollo-server";

export default {
    Query: {
        borrow: async (root, {_id}) => {
            return getBookBorrowData(_id);
        },
        borrows: async () => {
            const borrows = await Borrow.find({});
            const updatedBorrows = [];

            for await (const borrow of borrows) {
                const updatedBorrow = populateBorrowData(borrow);
                updatedBorrows.push(updatedBorrow);
            }
            return updatedBorrows;
        }
    },
    Mutation: {
        borrowBook: async (root, args, context) => {
            if (!context.authSuccessful) {
                throw(context.error);
            }

            //to do: add mutation to mark a book as returned

            //check if the book copy is already borrowed
            const bookBorrow = await Borrow.find({bookCopy: args.data.bookCopyId});
            const reader = await Reader.findById(args.data.readerId);

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
        },
        returnBook: async (root, {bookCopyId}, context) => {
            if (!context.authSuccessful) {
                throw(context.error);
            }

            const bookBorrow = await Borrow.find({bookCopy: bookCopyId, status: 1});
            bookBorrow[0].status = 0;
            await bookBorrow[0].save();
            return await populateBorrowData(bookBorrow[0]);
        }
    }
}

const getBookBorrowData = async (id) => {
    const bookBorrow = await Borrow.findById(id);
    return await populateBorrowData(bookBorrow);
}

const populateBorrowData = async (borrow) => {
    const reader = await Reader.findById(borrow.readerId);
    const bookCopy = await BookCopy.findById(borrow.bookCopy).populate("bookId");
    borrow.reader = reader;
    borrow.book = bookCopy.bookId;
    return borrow;
}