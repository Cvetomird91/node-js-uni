import { SyntheticEvent, useState } from 'react';
import { Book } from '../types/Book';
import BookFormProps from '../types/BookFormProps';

function BookForm({  book: initialBook, onSave, onCancel }: BookFormProps) {

    const [book, setBook] = useState(initialBook);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        
    }

    const handleChange = (event: any) => {
        
    }

    return (
        <form className="input-group vertical book-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Book Title</label>
            <input type="text" name="title" placeholder="enter title" value={book.title}/>
            <label htmlFor="cover">Cover Image URL</label>
            <input type="text" name="cover" placeholder="enter cover url" value={book.cover}/>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" placeholder="enter book author" value={book.author}/>
            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" placeholder="enter isbn" value={book.ISBN}/>
            <label htmlFor="date">Issue Date</label>
            <input type="date" name="date" value={book.date}/>

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span />
                <button type="button" className="bordered medium" onClick={onCancel}>
                cancel
                </button>
            </div>

        </form>
    );
}

export default BookForm;