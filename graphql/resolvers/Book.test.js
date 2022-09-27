import { describe, expect, test } from '@jest/globals';
import { ApolloServer, gql } from 'apollo-server';
import * as mockingoose from 'mockingoose';
import Book from "../../models/Book.js";
import BookCopy from "../../models/BookCopy.js";
import bookResolver from "./Book.js";
import bookType from "../types/Book.js";

describe('Book resolver', () => {

    let testServer;

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      mockingoose.resetAll();

      testServer = new ApolloServer({
        typeDefs: [bookType],
        resolvers: [bookResolver]
      });
    });

    it('get all books', async () => {
        Book.schema.path('copies', Object);

        const books = [{
            _id: '60999f1948d0c310bb55f40c',
            title: 'The Hunchback of Notre-Dame',
            ISBN: '9780517123751',
            date: '1831-03-16T00:00:00.000Z',
            cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
            author: 'Victor Hugo 2',
            copies: [{
                         _id: '609ad4b118789450a9b5ff9b',
                         bookId: '60999f1948d0c310bb55f40c',
                         status: 1
                    }]
        }];

        mockingoose(Book).toReturn(books, 'find');

        const result = await testServer.executeOperation({
            query: 'query { books { title, ISBN, date, cover, author, numberOfCopies } }'
        });

        expect(result.data.books[0]).toHaveProperty('title');
        expect(result.data.books[0]).toHaveProperty('ISBN');
        expect(result.data.books[0]).toHaveProperty('date');
        expect(result.data.books[0]).toHaveProperty('cover');
        expect(result.data.books[0]).toHaveProperty('author');
        expect(result.data.books[0]).toHaveProperty('numberOfCopies');

    });

    it('get a specific book', async() => {
        Book.schema.path('copies', Object);

        const books = [{
            _id: '60999f1948d0c310bb55f40c',
            title: 'The Hunchback of Notre-Dame',
            ISBN: '9780517123751',
            date: '1831-03-16T00:00:00.000Z',
            cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
            author: 'Victor Hugo 2',
            copies: [{
                         _id: '609ad4b118789450a9b5ff9b',
                         bookId: '60999f1948d0c310bb55f40c',
                         status: 1
                    }]
        }];

      mockingoose(Book).toReturn(books[0], 'findOne');
      const result = await testServer.executeOperation({
        query: 'query { book(_id: "60999f1948d0c310bb55f40c") { _id title ISBN date cover author numberOfCopies } }'
      });

      console.log(result.data.book);

      expect(result.data.book).toMatchObject({
                                                  _id: '60999f1948d0c310bb55f40c',
                                                  title: 'The Hunchback of Notre-Dame',
                                                  ISBN: '9780517123751',
                                                  date: new Date('1831-03-16T00:00:00.000Z'),
                                                  cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
                                                  author: 'Victor Hugo 2',
                                                  numberOfCopies: 1
                                             })

    });

});