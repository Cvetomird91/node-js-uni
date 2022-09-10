import * as mockingoose from 'mockingoose'
import Reader from "./Reader.js";
import {describe, expect, test} from '@jest/globals';

describe('Reader user model', () => {

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it('should return the doc with findById', () => {
        const _doc = {
            _id: '60999f1948d0c310bb55f40c',
            firstName: "Obi",
            lastName: "Wan"
        };

        mockingoose(Reader).toReturn(_doc, 'findOne');

        return Reader.findById({ _id: '60999f1948d0c310bb55f40c' }).then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });

    });

    it('should throw an exception when first and last name are missing', () => {
        const _doc = {
            _id: '60999f1948d0c310bb55f40c',
        };

        const reader = new Reader(_doc);
        const err = reader.validateSync();

        expect(err.errors).toHaveProperty('firstName');
        expect(err.errors).toHaveProperty('lastName');
    });

});