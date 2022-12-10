import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BookState } from '../state/BookStateTypes';
import Book from '../types/Book';
import { addBookTitle } from '../state/BookActions';

function BookCreationForm() {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [author, setAuthor] = useState('');
    const [ISBN, setIsbn] = useState('');
    const [date, setDate] = useState('');

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
        const book: Book = new Book({cover, title, date, author, ISBN});
        setErrors(() => validate(book));
        if (!isValid()) return;
        dispatch(addBookTitle(book));
    }

    return (
        <div className="book-creation-form">
            <button className="primary" onClick={() => setShow(!show)}>Add book title</button>
            {
                show
                ?
                <form className="input-group vertical book-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Book Title</label>
                    <input type="text" name="title" placeholder="enter title" onChange={(event) => {setTitle(event.target.value)}}/>
                    <label htmlFor="cover">Cover Image URL</label>
                    <input type="text" name="cover" placeholder="enter cover url" onChange={(event) => {setCover(event.target.value)}}/>
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" placeholder="enter book author" onChange={(event) => {setAuthor(event.target.value)}}/>
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" name="isbn" placeholder="enter isbn" onChange={(event) => {setIsbn(event.target.value)}}/>
                    <label htmlFor="date">Issue Date</label>
                    <input type="date" name="date" min="1600-01-01" onChange={(event) => {setDate(event.target.value)}}/>
        
                    <div className="input-group">
                        <button className="primary bordered medium">Save</button>
                        <span />
                        <button type="button" className="bordered medium" onClick={() => setShow(!show)}>
                        cancel
                        </button>
                    </div>
                </form>
                :null
            }
        </div>
    );
}

export default BookCreationForm;