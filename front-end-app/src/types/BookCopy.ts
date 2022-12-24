export class BookCopy {
    _id: string = '';
    bookId: string = '';

    constructor(initializer? : any) {
        if (!initializer) return;
        if (initializer._id) this._id = initializer._id;
        if (initializer.cover) this.bookId = initializer.bookId;
    }

}

export default BookCopy;