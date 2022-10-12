import { describe, expect } from '@jest/globals';
import { ApolloServer } from 'apollo-server';
import * as mockingoose from 'mockingoose';
import Reader from "../../models/Reader.js";
import readerResolver from "./Reader.js";
import readerType from "../types/Reader.js";

describe('Reader resolver', () => {

    let testServer;

    beforeEach(() => {
      jest.clearAllMocks();
      mockingoose.resetAll();

      testServer = new ApolloServer({
        typeDefs: [readerType],
        resolvers: [readerResolver],
        context: () =>  ({authSuccessful: true})
      });
    });

    it('get all readers', async () => {
        const readers = [{
            _id: "609aee8a6fbcdd17db4d3d99",
            firstName: "NextLevel",
            lastName: "Jedi",
            status: 1
        }]

        mockingoose(Reader).toReturn(readers, 'find');

        const result = await testServer.executeOperation({
          query: `query {
                       readers {
                         _id
                         firstName
                         lastName
                         status
                       }
                     }`
        });

        expect(result.data.readers[0]).toHaveProperty('_id');
        expect(result.data.readers[0]).toHaveProperty('firstName');
        expect(result.data.readers[0]).toHaveProperty('lastName');
        expect(result.data.readers[0]).toHaveProperty('status');

    });

    it('get a reader', async () => {
        const reader = {
            _id: "609aee8a6fbcdd17db4d3d99",
            firstName: "NextLevel",
            lastName: "Jedi",
            status: 1
        }

        mockingoose(Reader).toReturn(reader, 'findOne');

        const result = await testServer.executeOperation({
          query: `query {
                       reader(_id: "609aee8a6fbcdd17db4d3d99") {
                         _id
                         firstName
                         lastName
                         status
                       }
                     }`
        });

        expect(result.data.reader).toMatchObject({_id: "609aee8a6fbcdd17db4d3d99",
            firstName: "NextLevel", lastName: "Jedi", status: 1});
    });

});