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
                'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NjY2NTIzMjUsImV4cCI6MTY2NjczODcyNX0.FQwlF1rDeVD3U0eFHEiBi6JMk7rPtlgILBS-6sEP5r0'
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
    editBook(book: Book) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //todo: store token in local storage after login
                'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5nZWRlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NjY2NTIzMjUsImV4cCI6MTY2NjczODcyNX0.FQwlF1rDeVD3U0eFHEiBi6JMk7rPtlgILBS-6sEP5r0'
            },
            body: JSON.stringify({
                query: `mutation {
                          editBook (_id: ${book._id}, data:{
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