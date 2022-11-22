import Book from './Book';

interface BookListProps {
    books: Book[];
    onSave: (book: Book) => void;
}

export default BookListProps;