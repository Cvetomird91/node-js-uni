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
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="title">Book Title</label>
            <input type="text" name="title" placeholder="enter title" value={book.title}/>
            <label htmlFor="description">Book Description</label>
            <input type="text" name="description" placeholder="enter description" value={book.description}/>
            <label htmlFor="image">Image URL</label>
            <input type="text" name="image" placeholder="enter image url" value={book.image}/>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" placeholder="enter book author" value={book.author}/>
            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" placeholder="enter isbn" value={book.isbn}/>
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