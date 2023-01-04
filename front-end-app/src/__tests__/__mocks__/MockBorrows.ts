import { Borrow } from '../../types/Borrow';
import {MOCK_BOOKS} from "./MockBooks";
import {MOCK_READERS} from "./MockReaders";

export const MOCK_BORROWS = [
    new Borrow({dateFrom: '2023-01-01', dateTo: '2023-01-02', reader: MOCK_READERS[0], book: MOCK_BOOKS[0], bookCopyId: 'asd123', status: 1}),
    new Borrow({dateFrom: '2023-01-01', dateTo: '2023-01-02', reader: MOCK_READERS[1], book: MOCK_BOOKS[0], bookCopyId: 'abcdefg', status: 0}),
    new Borrow({dateFrom: '2023-01-01', dateTo: '2023-01-02', reader: MOCK_READERS[2], book: MOCK_BOOKS[0], bookCopyId: 'aaa111', status: 1}),
];