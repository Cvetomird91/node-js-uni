export class Book {
    cover: string = '';
    title: string = '';
    date: string = '';
    author: string = '';
    ISBN: string = '';
    description?: string = '';

    constructor(initializer? : any) {
        if (!initializer) return;
        if (initializer.cover) this.cover = initializer.cover;
        if (initializer.title) this.title = initializer.title;
        if (initializer.date) this.date = initializer.date;
        if (initializer.author) this.author = initializer.author;
        if (initializer.ISBN) this.ISBN = initializer.ISBN;
        if (initializer.description) this.description = initializer.description;
    }
}

export default Book;