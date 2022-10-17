import { describe, expect } from '@jest/globals';
import { ApolloServer } from 'apollo-server';
import * as mockingoose from 'mockingoose';
import Borrow from "../../models/Borrow.js";
import BookCopy from "../../models/BookCopy.js";
import Book from "../../models/Book.js";
import Reader from "../../models/Reader.js";
import borrowResolver from "./Borrow.js";
import bookResolver from "./Book.js";
import readerResolver from "./Reader.js";
import borrowType from "../types/Borrow.js";
import bookType from "../types/Book.js";
import readerType from "../types/Reader.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

describe('Borrow resolver', () => {

    let testServer;

    beforeEach(() => {
      jest.clearAllMocks();
      mockingoose.resetAll();

      testServer = new ApolloServer({
        typeDefs: mergeTypeDefs([borrowType, bookType, readerType]),
        resolvers: [borrowResolver, bookResolver, readerResolver],
        context: () =>  ({authSuccessful: true})
      });
    });

    it('get borrow by id', async () => {

        const reader = {
            _id: "609aee966fbcdd17db4d3d9a",
            firstName: "Tsvetomir",
            lastName: "Denchev",
            status: 1
        };

        const borrow = {
            _id: "609b8874f8f1f741248a68ab",
            bookCopy: "609ad6e718789450a9b5ffa5",
            readerId: reader,
            dateFrom: "2021-12-04T22:00:00.000Z",
            dateTo: "2021-12-05T22:00:00.000Z",
            status: 1
        };

        const bookCopy = {
            _id: "609ad6e718789450a9b5ffa5",
            bookId: {
                _id: "6099af74ca928252960fe17b",
                title: "Under the Yoke",
                ISBN: "978-0543691781",
                date: "1890-01-01T00:00:00.000Z",
                cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1368097546l/2445777.jpg",
                author: "Ivan Vazov"
            },
            populate: jest.fn(() => {return bookCopy}),
            status: 1
        };

        Borrow.findById = jest.fn(() => {return borrow});
        Reader.findById = jest.fn(() => {return reader});
        BookCopy.findById = jest.fn(() => {return bookCopy});

        const result = await testServer.executeOperation({
          query: `query {
                    borrow(_id:"609b8874f8f1f741248a68ab") {
                      _id
                      book {
                        _id
                        title
                        ISBN
                        date
                        cover
                        author
                      }
                      reader {
                        _id
                        firstName
                        lastName
                        status
                      }
                      dateFrom
                      dateTo
                    }
                 }`
        });

        expect(result.data.borrow.reader).toMatchObject(reader);
        expect(result.data.borrow.book).toMatchObject(bookCopy.bookId);
    });

    it('get book borrows', async () => {
        const reader = {
                    _id: "609aee966fbcdd17db4d3d9a",
                    firstName: "Tsvetomir",
                    lastName: "Denchev",
                    status: 1
                };

        const borrows = [{
            _id: "609b8874f8f1f741248a68ab",
            bookCopy: "609ad6e718789450a9b5ffa5",
            readerId: reader,
            dateFrom: "2021-12-04T22:00:00.000Z",
            dateTo: "2021-12-05T22:00:00.000Z",
            status: 1
        }];

        const bookCopy = {
            _id: "609ad6e718789450a9b5ffa5",
            bookId: {
                _id: "6099af74ca928252960fe17b",
                title: "Under the Yoke",
                ISBN: "978-0543691781",
                date: "1890-01-01T00:00:00.000Z",
                cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1368097546l/2445777.jpg",
                author: "Ivan Vazov"
            },
            populate: jest.fn(() => {return bookCopy}),
            status: 1
        };

        Borrow.find = jest.fn(() => {return borrows});
        Reader.findById = jest.fn(() => {return reader});
        BookCopy.findById = jest.fn(() => {return bookCopy});

        const result = await testServer.executeOperation({
          query: `query {
                    borrows {
                      _id
                      book {
                        _id
                        title
                        ISBN
                        date
                        cover
                        author
                      }
                      reader {
                        _id
                        firstName
                        lastName
                        status
                      }
                      dateFrom
                      dateTo
                    }
                 }`
        });

        expect(result.data.borrows[0].reader).toMatchObject(reader);
        expect(result.data.borrows[0].book).toMatchObject(bookCopy.bookId);

    });

});