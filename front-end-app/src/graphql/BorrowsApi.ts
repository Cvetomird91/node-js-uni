import { Reader } from '../types/Reader';
import { Book } from '../types/Book';
import { Borrow } from '../types/Borrow';
import RestUtils from '../utils/RestUtils';

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/graphql`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzE2MjE1NzUsImV4cCI6MTY3MTcwNzk3NX0.p9htU_YN887Sn6Ar4PlocboHy0963EwxOmwnYbX7fTo";

const BorrowsApi = {
    getBorrow(borrow: Borrow) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `query {
                            borrow(_id:"${borrow._id}") {
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
                            status
                            }
                        }`
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then((data) => {
            if (data && !data.errors) {
              const book: Book = new Book(data.data.borrow.book);
              const reader: Reader = new Reader(data.data.borrow.reader);

              return new Borrow({_id: data.data.borrow._id, 
                book, reader,
                dateFrom: data.data.borrow.dateFrom, 
                dateTo: data.data.borrow.dateTo, 
                status: data.data.borrow.status});
            } else {
              throw new Error(data.errors);
            }
          })
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the borrow. Please try again.'
            );
        });
    },
    getBorrows() {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
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
                            status
                            }
                        }`
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then(convertToBorrowModels)        
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the borrows. Please try again.'
            );
        });
    },
    borrowBookCopy(borrow: Borrow) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `mutation {
                            borrowBook(data: {
                                bookCopyId:"${borrow.bookCopyId}",
                                readerId:"${borrow.reader._id}",
                                dateFrom: "12-05-2021",
                                dateTo: "12-06-2021"
                            }) {
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
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then((data) => {
            if (data && !data.errors) {
              const book: Book = new Book(data.data.borrowBook.book);
              const reader: Reader = new Reader(data.data.borrowBook.reader);

              return new Borrow({_id: data.data.borrowBook._id, 
                book, reader,
                dateFrom: data.data.borrowBook.dateFrom, 
                dateTo: data.data.borrowBook.dateTo, 
                status: data.data.borrowBook.status});
            } else {
              throw new Error(data.errors);
            }
          })        
          .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the borrowing the copy. Please try again.'
            );
        });
    },
    returnBookCopy(borrow: Borrow) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `mutation {
                            returnBook(bookCopyId:"${borrow.bookCopyId}"){
                            _id
                            status
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
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then((data) => {
            if (!data.errors) {
              const book: Book = new Book(data.data.borrowBook.book);
              const reader: Reader = new Reader(data.data.borrowBook.reader);

              return new Borrow({_id: data.data.borrowBook._id, 
                book, reader,
                dateFrom: data.data.borrowBook.dateFrom, 
                dateTo: data.data.borrowBook.dateTo, 
                status: data.data.borrowBook.status});
            } else {
              throw new Error(data.errors);
            }
          })        
          .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error returning the book copy. Please try again.'
            );
        });
    }
}

function convertToBorrowModels(data: any): Borrow[] {
    let borrows: Borrow[] = [];
    if (data && data.data) {
        data.data.borrows.forEach((borrow: any) => {
            const book: Book = new Book(borrow.book);
            const reader: Reader = new Reader(borrow.reader);
    
            borrows.push(new Borrow({_id: borrow._id, 
                book, reader,
                dateFrom: borrow.dateFrom, 
                dateTo: borrow.dateTo, 
                status: borrow.status}));
        });
    }

    return borrows;
}

export { BorrowsApi };