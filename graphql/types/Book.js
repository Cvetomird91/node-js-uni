import { gql } from "apollo-server";

export default gql`

    scalar ISODate

    input BookInput {
        title: String!
        ISBN: String!
        date: String!
        cover: String!
        author: String!
    }

    type Book {
        _id: String!
        title: String!
        ISBN: String!
        date: ISODate!
        cover: String!
        author: String!
        numberOfCopies: Int
        isDeleted: String
    }

    type Query {
        book(_id: String!): Book
        books: [Book]
    }

    type Mutation {
        addTitle(data: BookInput!): Book
        addBookCopy(ISBN: String!): Book
    }

`

/*
        editUser(_id: String!, data: BookInput!): Book
        deleteBook(_id: String!): Book
*/