import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BorrowState } from '../state/BorrowStateTypes';
import BorrowCreationFormProps from '../types/BorrowCreationFormProps';

function BorrowCreationForm(props: BorrowCreationFormProps) {
    const {borrows, books, readers} = props;
    const [show, setShow] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<BorrowState, any, AnyAction>>();

    return (
        <div className="borrow-creation-form">
            <button className="primary" onClick={() => setShow(!show)}>Add book title</button>
            {
                show
                ?
                <form className="input-group vertical book-form">
                    <select className="form-control">
                        {books.map((book) => {
                            return book.copies.filter(
                                        (copy) => 
                                            !borrows.find((borrow) => borrow.bookCopyId === copy._id)
                                    )
                                        .map((copy) => (
                                        <option>{book.author} - {book.title}, ISBN: {book.ISBN}</option>
                            ));
                        })}
                    </select>
                    <select className="form-control">
                        {readers.map((reader) => {
                            return (
                                <option>{reader.firstName} {reader.lastName}</option>
                            );
                        })}
                    </select>

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

export default BorrowCreationForm;