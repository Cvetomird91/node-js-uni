import { Reader } from '../types/Reader';
import RestUtils from '../utils/RestUtils';

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/graphql`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzA3MTM0MDUsImV4cCI6MTY3MDc5OTgwNX0.LWfkVtSPVl1XsmpyAxsPnlAItvsJZlWhEEG3NswyX5I";

const ReadersApi = {
    getAllReaders() {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `query {
                    readers {
                      _id
                      firstName
                      lastName
                      status
                    }
                  }`
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then(convertToReaderModels)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the books. Please try again.'
            );
        });
    }
};

function convertToReaderModels(data: any): Reader[] {
    let readers: Reader[] = [];
    data.data.books.forEach((book: any) => {
        readers.push(new Reader(book));
    });
    return readers;
}

export { ReadersApi };