import * as mockingoose from 'mockingoose'
import BookCopy from "./BookCopy.js";
import {describe, expect, test} from '@jest/globals';

describe('BookCopy model', () => {

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it('should return the doc with findById', () => {
        const _doc = {
            _id: '609e818d6da43f19180f4265',
            bookId: '60999f1948d0c310bb55f40c'
        };

        mockingoose(BookCopy).toReturn(_doc, 'findOne');

        return BookCopy.findById({ _id: '609e818d6da43f19180f4265' }).then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });

    });

    it('should throw an exception when book is missing', () => {
        const _doc = {
            _id: '60999f1948d0c310bb55f40c',
        };

        const bookCopy = new BookCopy(_doc);
        const err = bookCopy.validateSync();

        expect(err.errors).toHaveProperty('bookId');
    });
});