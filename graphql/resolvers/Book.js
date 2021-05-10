import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;
import Book from "../../models/Book.js";

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
        addBook: async (root, args) => {
            const bookPublishDate = new Date(args.data.date);
            args.data.date = bookPublishDate;
            const bookData = new Book(args.data);

            await bookData.save();

            return bookData;
        }
    },
    ISODate: GraphQLDateTime
}