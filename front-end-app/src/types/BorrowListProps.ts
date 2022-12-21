import { Borrow } from './Borrow';
import { Reader } from './Reader';

interface BorrowListProps {
    borrows: Borrow[];
    readers: Reader[];
}

export default BorrowListProps;