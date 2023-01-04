import { Reader } from '../readers/Reader';
import { Book } from '../books/Book';

export class Borrow {
    _id: string = '';
    book: Book = new Book({});
    reader: Reader = new Reader({});
    dateFrom: string = '';
    dateTo: string = '';
    status: number = 0;
    bookCopyId: string = '';

    constructor(initializer? : any) {
        if (!initializer) return;
        if (initializer._id) this._id = initializer._id;
        if (initializer.book) this.book = initializer.book;
        if (initializer.reader) this.reader = initializer.reader;
        if (initializer.dateFrom) this.dateFrom = initializer.dateFrom;
        if (initializer.dateTo) this.dateTo = initializer.dateTo;
        if (initializer.status) this.status = initializer.status;
        if (initializer.bookCopyId) this.bookCopyId = initializer.bookCopyId;
    }
}

export default Borrow;