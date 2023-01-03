import { Book } from '../../types/Book';

export const MOCK_BOOKS = [
    new Book({image: "https://images-na.ssl-images-amazon.com/images/I/41CB164PM5L._SX325_BO1,204,203,200_.jpg", 
              title: "The Hunchback of Notre-Dame", date: "1831-03-16", author: "Victor Hugo", isbn: "9780517123751"}),
    new Book({image: "https://images-na.ssl-images-amazon.com/images/I/41aM4xOZxaL._SX277_BO1,204,203,200_.jpg",
              title: "1984", date: "1961-01-01", author: "George Orwell", isbn: "978-0451524935"}),
    new Book({image: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg",
              title: "One Hundred Years of Solitude", date: "1992-05-16", author: "Gabriel Garcia Marquez", isbn: "0060883286"})
];