import { gql } from "apollo-server";

export default gql`

    scalar ISODate

    input BorrowInput {
        bookCopyId: String!
        readerId: String!
        dateFrom: String!
        dateTo: String!
    }

    type Borrow {
        _id: String!
        bookCopyId: String!
        book: Book
        reader: Reader
        dateFrom: ISODate!
        dateTo: ISODate!
        status: Int
    }

    type Query {
        borrow(_id: String!): Borrow
        borrows: [Borrow]
    }

    type Mutation {
        borrowBook(data: BorrowInput!): Borrow
        returnBook(bookCopyId: String!): Borrow
    }
`