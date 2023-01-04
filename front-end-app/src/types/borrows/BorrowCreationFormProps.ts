import Borrow from './Borrow';
import Book from '../books/Book';
import Reader from '../readers/Reader';

interface BorrowCreationFormProps {
    borrows: Borrow[];
    books: Book[];
    readers: Reader[];
}

export default BorrowCreationFormProps;