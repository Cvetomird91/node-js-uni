import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;
import Book from "../../models/Book.js";
import BookCopy from "../../models/BookCopy.js";


export default {
    Query: {
        books: async () => {
            const books = await Book.find({});
            return books;
        },
        book: async (root, {_id}) => {
            const book = await Book.findById(_id);
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
            const book = await Book.find({ISBN});

            const newCopy = new BookCopy({bookId: book[0]._id.toString(), status: 1});
            await newCopy.save();

            //get count of book copies and assign them to response
            const bookCopyCount = await BookCopy.find({bookId: book[0]._id});
            
            book[0].copies = bookCopyCount.length;

            return book[0];
        }
    },
    ISODate: GraphQLDateTime
}