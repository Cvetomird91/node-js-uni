export class Book {
    _id: string = '';
    cover: string = '';
    title: string = '';
    date: string = '';
    author: string = '';
    ISBN: string = '';
    numberOfCopies: number = 0;

    constructor(initializer? : any) {
        if (!initializer) return;
        if (initializer._id) this._id = initializer._id;
        if (initializer.cover) this.cover = initializer.cover;
        if (initializer.title) this.title = initializer.title;
        if (initializer.date) this.date = initializer.date;
        if (initializer.author) this.author = initializer.author;
        if (initializer.ISBN) this.ISBN = initializer.ISBN;
        if (initializer.numberOfCopies) this.numberOfCopies = initializer.numberOfCopies;
    }
}

export default Book;