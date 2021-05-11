import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;
import Book from "../../models/Book.js";
import BookCopy from "../../models/BookCopy.js";

export default {
    Query: {
        books: async () => {
            const books = await Book.find({}).populate("copies");
            books.forEach(async (book) => {
                book.numberOfCopies = book.copies.length;
            });
            return books;
        },
        book: async (root, {_id}) => {
            const book = await Book.findById(_id).populate("copies");
            book.numberOfCopies = book.copies.length;
            return book;
        }
    },
    Mutation: {
        addTitle: async (root, args) => {
            const bookPublishDate = new Date(args.data.date);
            args.data.date = bookPublishDate;
            const bookData = new Book(args.data);

            await bookData.save();

            return bookData;
        },
        addBookCopy: async(root, {ISBN}) => {
            const book = await Book.find({ISBN}).populate("copies");

            const newCopy = new BookCopy({bookId: book[0]._id.toString(), status: 1});
            await newCopy.save();

            if (book[0].copies) {
                book[0].copies.push(newCopy);
            } else {
                book[0].copies = [newCopy];
            }
            book[0].save();

            // get count of book copies and assign them to response
            const bookCopies = await BookCopy.find({bookId: book[0]._id});
            book[0].numberOfCopies = bookCopies.length;

            return book[0];
        },
        editBook: async (root, {_id, data}) => {
            const book = await Book.findByIdAndUpdate(_id,
                {$set: data}, {new: true});
            return book;
        }
    },
    ISODate: GraphQLDateTime
}