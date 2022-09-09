import * as mockingoose from 'mockingoose'
import Book from "./Book.js";
import {describe, expect, test} from '@jest/globals';

describe('Book user model', () => {

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it('should return the doc with findById', () => {
        const _doc = {
            _id: '60999f1948d0c310bb55f40c',
            title: 'The Hunchback of Notre-Dame',
            ISBN: '9780517123751',
            date: '1831-03-16T00:00:00.000Z',
            cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
            author: 'Victor Hugo 2'
        };

        mockingoose(Book).toReturn(_doc, 'findOne');

        return Book.findById({ _id: '60999f1948d0c310bb55f40c' }).then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });

    });

    it('should throw an exception when ISBN is missing', () => {
        const _doc = {
            _id: '60999f1948d0c310bb55f40c',
            date: '1831-03-16T00:00:00.000Z',
            cover: 'https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg',
        };

        const book = new Book(_doc);
        const err = book.validateSync();

        expect(err.errors).toHaveProperty('ISBN');
        expect(err.errors).toHaveProperty('title');
        expect(err.errors).toHaveProperty('author');
    });
});