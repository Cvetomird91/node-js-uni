import { SyntheticEvent, useState } from 'react';
import { Book } from '../types/Book';
import BookFormProps from '../types/BookFormProps';
import { useDispatch } from 'react-redux';
import { updateBook } from '../state/BookActions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BookState } from '../state/BookStateTypes';

function BookForm({  book: initialBook, onCancel }: BookFormProps) {
    const [book, setBook] = useState(initialBook);
    const [errors, setErrors] = useState({
        cover: '',
        title: '',
        date: '',
        author: '',
        ISBN: ''
    });
    const dispatch = useDispatch<ThunkDispatch<BookState, any, AnyAction>>();

    function validate(book: Book) {
        let errors: any = { cover:'', title: '', date: '', author: '', ISBN: ''};
        if (book.cover.length === 0) {
            errors.cover = 'Cover is required.';
        }

        if (book.author.length === 0) {
            errors.author = 'Author is required.';
        }

        if (book.title.length === 0) {
            errors.title = 'Title is required.';
        }

        if (book.ISBN.length === 0) {
            errors.ISBN = 'ISBN is required.';
        }

        if (book.date.length === 0) {
            errors.date = 'Date is required.';
        }

        return errors;
    }

    function isValid() {
        return (
            errors.cover.length === 0 &&
            errors.title.length === 0 &&
            errors.date.length === 0 &&
            errors.author.length === 0 &&
            errors.ISBN.length === 0
        );
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        dispatch(updateBook(book));
    }

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue
        };

        let updatedBook: Book;

        setBook((book) => {
            updatedBook = new Book({...book, ...change });
            return updatedBook;
        });
        setErrors(() => validate(updatedBook));
    };

    return (
        <form className="input-group vertical book-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Book Title</label>
            <input type="text" name="title" placeholder="enter title" value={book.title} onChange={handleChange}/>
            <label htmlFor="cover">Cover Image URL</label>
            <input type="text" name="cover" placeholder="enter cover url" value={book.cover} onChange={handleChange}/>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" placeholder="enter book author" value={book.author} onChange={handleChange}/>
            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" placeholder="enter isbn" value={book.ISBN} onChange={handleChange}/>
            <label htmlFor="date">Issue Date</label>
            <input type="date" name="date" value={book.date} onChange={handleChange}/>

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