import * as mockingoose from 'mockingoose'
import Borrow from "./Borrow.js";
import {describe, expect, test} from '@jest/globals';

describe('Borrow model', () => {

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it('should return the doc with findById', () => {
        const _doc = {
            _id: '609e818d6da43f19180f4265',
            readerId: '609aee8a6fbcdd17db4d3d99',
            //todo: make sure if this field is needed at all (probably not)
            book: '60999f1948d0c310bb55f40c',
            bookCopy: {
                _id: "609ad74218789450a9b5ffb5",
                bookId: '60999f1948d0c310bb55f40c',
                status: 1
            },
            dateFrom: new Date("2021-12-04T22:00:00.000+0000"),
            dateTo: new Date("2021-12-05T22:00:00.000+0000"),
            status: 1,
        };

        const _result = _doc;
        _result.dateFrom = "2021-12-04T22:00:00.000Z";
        _result.dateTo = "2021-12-05T22:00:00.000Z";
        _result.bookCopy = "609ad74218789450a9b5ffb5";

        mockingoose(Borrow).toReturn(_doc, 'findOne');

        return Borrow.findById({ _id: '60999f1948d0c310bb55f40c' }).then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });

    });

    it('should throw an exception when book copy and reader are missing', () => {
        const _doc = {
            _id: '60999f1948d0c310bb55f40c',
        };

        const borrow = new Borrow(_doc);
        const err = borrow.validateSync();

        expect(err.errors).toHaveProperty('bookCopy');
        expect(err.errors).toHaveProperty('readerId');
    });
});