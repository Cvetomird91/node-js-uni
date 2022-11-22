
import { Book } from './Book';

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
}

export default BookCardProps;