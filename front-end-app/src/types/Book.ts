export class Book {
    image: string = '';
    title: string = '';
    date: string = '';
    author: string = '';
    isbn: string = '';
    description?: string = '';

    constructor(initializer? : any) {
        if (!initializer) return;
        if (initializer.image) this.image = initializer.image;
        if (initializer.title) this.title = initializer.title;
        if (initializer.date) this.date = initializer.date;
        if (initializer.author) this.author = initializer.author;
        if (initializer.isbn) this.isbn = initializer.isbn;
        if (initializer.description) this.description = initializer.description;
    }
}

export default Book;