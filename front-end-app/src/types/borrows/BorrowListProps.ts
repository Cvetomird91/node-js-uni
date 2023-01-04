import { Borrow } from './Borrow';
import { Reader } from '../readers/Reader';

interface BorrowListProps {
    borrows: Borrow[];
    readers: Reader[];
}

export default BorrowListProps;