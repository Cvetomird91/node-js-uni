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
      jest.clearAllMocks();
      mockingoose.resetAll();

      testServer = new ApolloServer({
        typeDefs: [bookType],
        resolvers: [bookResolver],
        context: () =>  ({authSuccessful: true})
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

      expect(result.data.book).toMatchObject({_id: '60999f1948d0c310bb55f40c', title: 'The Hunchback of Notre-Dame',
                                              ISBN: '9780517123751', date: new Date('1831-03-16T00:00:00.000Z'), cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
                                              author: 'Victor Hugo 2', numberOfCopies: 1})
    });

    it('addTitle mutation', async () => {
      const book = {
          _id: '60999f1948d0c310bb55f40c',
          title: 'The Hunchback of Notre-Dame',
          ISBN: '9780517123751',
          date: new Date('1831-03-16'),
          cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
          author: 'Victor Hugo'
      };

      mockingoose(Book).toReturn(book, 'save');

      const result = await testServer.executeOperation({
        query: 'mutation { addTitle(data: {title: "The Hunchback of Notre-Dame", ISBN: "9780517123751", date: "1831-03-16", cover: "https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg", author: "Victor Hugo"}) { _id title ISBN date cover author numberOfCopies } }'
      });

      expect(result.data.addTitle).toMatchObject({title: 'The Hunchback of Notre-Dame',
                                               ISBN: '9780517123751', date: new Date('1831-03-16T00:00:00.000Z'),
                                               cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
                                               author: 'Victor Hugo'})

    });

    it('addBookCopy mutation', async () => {
        Book.schema.path('copies', Object);

        const book = [{
            _id: '60999f1948d0c310bb55f40c',
            title: 'The Hunchback of Notre-Dame',
            ISBN: '9780517123751',
            date: '1831-03-16T00:00:00.000Z',
            cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
            author: 'Victor Hugo',
            copies: [{
                         _id: '609ad4b118789450a9b5ff9b',
                         bookId: '60999f1948d0c310bb55f40c',
                         status: 1
                    }]
        }];

        const bookCopies = [{
             _id: '609ad4b118789450a9b5ff9b',
             bookId: '60999f1948d0c310bb55f40c',
             status: 1
        },
        {
             _id: '609ad6d418789450a9b5ff9d',
             bookId: '60999f1948d0c310bb55f40c',
             status: 1
        }];

        mockingoose(Book).toReturn(book, 'find');
        mockingoose(BookCopy).toReturn(bookCopies, 'find');

        const result = await testServer.executeOperation({
          query: 'mutation { addBookCopy(ISBN: "978-0451524935") { _id title numberOfCopies } }'
        });

        expect(result.data.addBookCopy).toMatchObject({title: "The Hunchback of Notre-Dame", numberOfCopies: 2})

    });

    it('editBook mutation', async () => {

        const book = {
            _id: '609e620a51303b6c6d386794',
            title: 'A Descent into the Maelström',
            ISBN: '9781545304280',
            date: '1919-01-01',
            cover: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Maelstrom-Clarke.jpg',
            author: 'Edgar Alan Poe',
            copies: [{
                         _id: '609ad4b118789450a9b5ff9b',
                         bookId: '60999f1948d0c310bb55f40c',
                         status: 1
                    }]
        };

        Book.findByIdAndUpdate = jest.fn(() => {return book});

        const result = await testServer.executeOperation({
          query: `mutation {
                       editBook (_id:"609e620a51303b6c6d386794", data:{
                         author: "Edgar Alan Poe",
                         title: "A Descent into the Maelström",
                         ISBN:"9781545304280",
                         date:"1919-01-01",
                         cover:"https://upload.wikimedia.org/wikipedia/commons/4/45/Maelstrom-Clarke.jpg"
                       }){
                         _id
                         author
                         title
                         ISBN
                         date
                         cover
                       }
                     }`
        });

        expect(result.data.editBook).toMatchObject({author: "Edgar Alan Poe",
                    title: "A Descent into the Maelström",
                    ISBN: "9781545304280",
                    date: "1919-01-01",
                    cover: "https://upload.wikimedia.org/wikipedia/commons/4/45/Maelstrom-Clarke.jpg"})

    });

});