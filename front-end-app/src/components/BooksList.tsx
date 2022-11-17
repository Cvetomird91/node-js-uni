import BookCard from "./BookCard";
import { Book } from "../types/Book";
import { useState } from "react";

const books: Book[] = [
    {image: "https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg", title: "The Hunchback of Notre-Dame", date: "1831-03-16", author: "Victor Hugo", isbn: "9780517123751"},
    {image: "https://images-na.ssl-images-amazon.com/images/I/41aM4xOZxaL._SX277_BO1,204,203,200_.jpg", title: "1984", date: "1961-01-01", author: "George Orwell", isbn: "978-0451524935"},
    {image: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg", title: "One Hundred Years of Solitude", date: "1992-05-16", author: "Gabriel Garcia Marquez", isbn: "0060883286"}
];

type BookListProps = {
  children: React.ReactNode;
};

export function BooksList() {
  const [booksState, setBooks] = useState(books);

  return (
    <>
    
        <BookCard image={books[0].image} title={books[0].title} date={books[0].date}
         author={books[0].author} isbn={books[0].isbn} />
        <BookCard image={books[1].image} title={books[1].title} date={books[1].date}
         author={books[1].author} isbn={books[1].isbn} />
        <BookCard image={books[2].image} title={books[2].title} date={books[2].date}
         author={books[2].author} isbn={books[2].isbn} />

      {/* {props.children} */}
    </>
  )
}
