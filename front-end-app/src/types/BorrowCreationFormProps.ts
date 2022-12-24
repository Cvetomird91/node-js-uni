import Borrow from './Borrow';
import Book from './Book';
import Reader from './Reader';

interface BorrowCreationFormProps {
    borrows: Borrow[];
    books: Book[];
    readers: Reader[];
}

export default BorrowCreationFormProps;