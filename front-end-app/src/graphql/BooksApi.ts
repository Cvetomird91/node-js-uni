import Book from "../types/Book";

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/graphql`;

const BookApi = {
    getAllBooks() {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2Njk5OTEyOTksImV4cCI6MTY3MDA3NzY5OX0.zyotP8yTWmv6m6q3WOZECoFaLaJgEUt2i8k5kkwVOkw'
            },
            body: JSON.stringify({
                query: `query { books { _id, title, ISBN, date, cover, author, numberOfCopies } }`
            })
        })
        .then(checkStatus)
        .then(parseJSON)
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
            'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzAxNzA1OTEsImV4cCI6MTY3MDI1Njk5MX0.0nsFnBhQFIgVmCGBncaO7lgjWITdh5VNFP0DTITsv_8'
        },
        body: JSON.stringify({
            query: `query { book(_id: "${bookId}") { _id title ISBN date cover author numberOfCopies } }`
        })
      })
      .then(checkStatus)
      .then(parseJSON)
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
                'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzAxNzA1OTEsImV4cCI6MTY3MDI1Njk5MX0.0nsFnBhQFIgVmCGBncaO7lgjWITdh5VNFP0DTITsv_8'
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
        .then(checkStatus)
        .then(parseJSON)
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
      console.log(book);
      return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //todo: store token in local storage after login
            'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzAxNzA1OTEsImV4cCI6MTY3MDI1Njk5MX0.0nsFnBhQFIgVmCGBncaO7lgjWITdh5VNFP0DTITsv_8'
        },
        body: JSON.stringify({
            query: `mutation { addBookCopy(ISBN: "${book.ISBN}") { _id, title, ISBN, date, cover, author, numberOfCopies } }`
        })
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data);
        if (!data.errors) {
          return new Book(data.data.addBookCopy);
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
    }
};

function checkStatus(response: any) {
    if (response.ok) {
      return response;
    } else {
      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };
      console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
  
      let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
      throw new Error(errorMessage);
    }
  }

function translateStatusToErrorMessage(status: number) {
    switch (status) {
      case 500:
        return 'Server error';
      default:
        return 'There was an error retrieving the project(s). Please try again.';
  }
}

function parseJSON(response: Response) {
    return response.json();
}

function convertToBookModels(data: any): Book[] {
    let books: Book[] = [];
    data.data.books.forEach((book: any) => {
        books.push(new Book(book));
    });
    return books;
}

export { BookApi };