import { Reader } from '../types/Reader';
import RestUtils from '../utils/RestUtils';

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/graphql`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzE2MjE1NzUsImV4cCI6MTY3MTcwNzk3NX0.p9htU_YN887Sn6Ar4PlocboHy0963EwxOmwnYbX7fTo";

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
              'There was an error retrieving the readers. Please try again.'
            );
        });
    },
    updateReader(reader: Reader) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `mutation {
                            editReader(_id:"${reader._id}", data:{
                                firstName:"${reader.firstName}",
                                lastName:"${reader.lastName}",
                            }) {
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
          .then((data) => {
            if (!data.errors) {
              return new Reader(data.data.editReader);
            } else {
              throw new Error(data.errors);
            }
          })
          .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error updating a reader. Please try again.'
            );
          });
    },
    deleteReader(readerId: string) {
        return fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              //todo: store token in local storage after login
              'Authentication': `Bearer ${token}`
          },
          body: JSON.stringify({
              query: `mutation {
                        deleteReader(_id: "${readerId}") {
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
      .then((data) => {
        if (!data.errors) {
          return new Reader(data.data.deleteReader);
        } else {
          throw new Error(data.errors);
        }
      })
      .catch((error: TypeError) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error retrieving the readers. Please try again.'
          );
      });
    },
    addReader(reader: Reader) {
      return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //todo: store token in local storage after login
            'Authentication': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `mutation {
                        addReader(data:{
                            firstName:"${reader.firstName}",
                            lastName:"${reader.lastName}",
                        }) {
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
      .then((data) => {
        if (!data.errors) {
          return new Reader(data.data.addReader);
        } else {
          throw new Error(data.errors);
        }
      })
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
            'There was an error updating a reader. Please try again.'
        );
      });
    }
}

function convertToReaderModels(data: any): Reader[] {
    let readers: Reader[] = [];
    data.data.readers.forEach((book: any) => {
        readers.push(new Reader(book));
    });
    return readers;
}

export { ReadersApi };