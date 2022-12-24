import Book from "../types/Book";
import BookCopy from "../types/BookCopy";
import RestUtils from '../utils/RestUtils';

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/graphql`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzE4ODk0OTgsImV4cCI6MTY3MTk3NTg5OH0.HMMz2T2xBQHF3a8RgmyI8xZGJRcsj0GKeT3gS11pjYk";

const BookApi = {
    getAllBooks() {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `query 
                          { books 
                            { 
                              _id, 
                              title 
                              ISBN 
                              date 
                              cover
                              author
                              numberOfCopies
                              copies {
                                _id
                                bookId
                                status
                              }
                            } 
                          }`
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then(convertToBookModels)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the books. Please try again.'
            );
        });
    },
    getBook(bookId: any) {
      return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //todo: store token in local storage after login
            'Authentication': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `query { book(_id: "${bookId}") { _id title ISBN date cover author numberOfCopies } }`
        })
      })
      .then(RestUtils.checkStatus)
      .then(RestUtils.parseJSON)
      .then((data) => {
        if (!data.errors) {
          return new Book(data.data.book);
        } else {
          throw new Error(data.errors);
        }
      })
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the book. Please try again.'
        );
      });
    },
    editBook(book: Book) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `mutation {
                          editBook (_id: "${book._id}", data:{
                            author: "${book.author}",
                            title: "${book.title}",
                            ISBN: "${book.ISBN}",
                            date: "${book.date}",
                            cover: "${book.cover}"
                          }){
                            _id
                            author
                            title
                            ISBN
                            date
                            cover
                          }
                        }`
            })
        })
        .then(RestUtils.checkStatus)
        .then(RestUtils.parseJSON)
        .then((data) => {
          if (!data.errors) {
            return new Book(data.data.editBook);
          } else {
            throw new Error(data.errors);
          }
        })
        .catch((error: TypeError) => {
          console.log('log client error ' + error);
          throw new Error(
          'There was an error updating a book. Please try again.'
          );
        });

    },
    addBookCopy(book: Book) {
      return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //todo: store token in local storage after login
            'Authentication': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `mutation { addBookCopy(ISBN: "${book.ISBN}") { _id, title, ISBN, date, cover, author, numberOfCopies } }`
        })
      })
      .then(RestUtils.checkStatus)
      .then(RestUtils.parseJSON)
      .then((data) => {
        if (!data.errors) {
          return new Book(data.data.addBookCopy);
        } else {
          throw new Error(data.errors);
        }
      })
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
        'There was an error adding a book copy. Please try again.'
        );
      });
    },
    addBookTitle(book: Book) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //todo: store token in local storage after login
            'Authentication': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `mutation { addTitle(data: {title: "${book.title}", ISBN: "${book.ISBN}", date: "${book.date}", 
          cover: "${book.cover}", author: "${book.author}"}) { _id title ISBN date cover author numberOfCopies } }`
        })
      })
      .then(RestUtils.checkStatus)
      .then(RestUtils.parseJSON)
      .then((data) => {
        if (!data.errors) {
          return new Book(data.data.addTitle);
        } else {
          throw new Error(data.errors);
        }
      })
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
        'There was an error adding a book title. Please try again.'
        );
      });
    }
};

function convertToBookModels(data: any): Book[] {
    let books: Book[] = [];
    data.data.books.forEach((book: any) => {
        let copies: BookCopy[] = [];
        book.copies.forEach((copy: any) => {
          copies.push(new BookCopy(copy));
        });
        let b = new Book(book);
        b.copies = copies;
        books.push(b);
    });
    console.log(books);
    return books;
}

export { BookApi };