import BookCard from "./BookCard";
import { Book } from "../types/Book";
import { useState } from "react";

const books: Book[] = [
    {image: "https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg", title: "The Hunchback of Notre-Dame", date: "1831-03-16", author: "Victor Hugo", isbn: "9780517123751"},
    {image: "https://images-na.ssl-images-amazon.com/images/I/41aM4xOZxaL._SX277_BO1,204,203,200_.jpg", title: "1984", date: "1961-01-01", author: "George Orwell", isbn: "978-0451524935"},
    {image: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg", title: "One Hundred Years of Solitude", date: "1992-05-16", author: "Gabriel Garcia Marquez", isbn: "0060883286"},
    { "title" : "The Hunchback of Notre-Dame", "isbn" : "9780517123751", "date" : "1831-03-16T00:00:00.000+0000" , "image" : "https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg", "author" : "Victor Hugo 2" },
    { "title" : "A Descent into the Maelström", "isbn" : "9781545304280", "date" : "1919-01-01T00:00:00.000+0000" , "image" : "https://upload.wikimedia.org/wikipedia/commons/4/45/Maelstrom-Clarke.jpg", "author" : "Edgar Alan Poe" },
    { "title" : "1984", "isbn" : "978-0451524935", "date" : "1961-01-01T00:00:00.000+0000" , "image" : "https://images-na.ssl-images-amazon.com/images/I/41aM4xOZxaL._SX277_BO1,204,203,200_.jpg", "author" : "George Orwell" },
    { "title" : "The Holographic Universe", "isbn" : "9780060163815", "date" :  "1992-05-16T00:00:00.000+0000" , "image" : "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347752336l/319014.jpg", "author" : "Michael Tolbot" },
    { "title" : "One Hundred Years of Solitude", "isbn" : "0060883286", "date" :  "1992-05-16T00:00:00.000+0000" , "image" : "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg", "author" : "Gabriel Garcia Marquez" },
    { "title" : "Harry Potter and the Philosopher's stonet", "isbn" : "9780439554930", "date" : "1997-06-26T00:00:00.000+0000" , "image" : "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg", "author" : "Joan Rowling" },
    { "title" : "In Search of the Castaways", "isbn" : "9780975361566", "date" : "1867-01-01T00:00:00.000+0000" , "image" : "https://upload.wikimedia.org/wikipedia/commons/e/e2/%27The_Children_of_Captain_Grant%27_by_%C3%89douard_Riou_001.jpg", "author" : "Jules Vernes" },
    { "title" : "Under the Yoke", "isbn" : "978-0543691781", "date" : "1890-01-01T00:00:00.000+0000" , "image" : "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1368097546l/2445777.jpg", "author" : "Ivan Vazov" }
];

type BookListProps = {
  children: React.ReactNode;
};

const BooksList: React.FC = () => {
  const [booksState, setBooks] = useState(books);

  return (
    <div className="row">
      {booksState.map((book, index) => (
                <BookCard image={book.image} title={book.title} date={book.date}
                author={book.author} isbn={book.isbn} />
      ))}
    </div>
  )
}

export default BooksList;