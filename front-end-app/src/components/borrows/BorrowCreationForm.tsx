import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BorrowState } from '../../state/borrows/BorrowStateTypes';
import { borrowBookCopy } from '../../state/borrows/BorrowActions';
import BorrowCreationFormProps from '../../types/BorrowCreationFormProps';
import BorrowCreationFormState from '../../types/BorrowCreationFormState';
import Reader from '../../types/Reader';
import Borrow from '../../types/Borrow';

function BorrowCreationForm(props: BorrowCreationFormProps) {
    const {borrows, books, readers} = props;
    const [show, setShow] = useState(false);
    const initialReaderState: BorrowCreationFormState = {
        bookCopyId: "",
        readerId: "",
        dateFrom: "",
        dateTo: ""
    }

    const [formData, updateFormData] = useState(initialReaderState);
    const dispatch = useDispatch<ThunkDispatch<BorrowState, any, AnyAction>>();

    const handleChange = (event: any) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const borrow: Borrow = new Borrow({reader: new Reader({_id: formData.readerId}), 
            bookCopyId: formData.bookCopyId,
            dateFrom: formData.dateFrom, dateTo: formData.dateTo})
        dispatch(borrowBookCopy(borrow));
        setShow(false);
    }

    return (
        <div className="borrow-creation-form">
            <button className="primary" onClick={() => setShow(!show)}>Add book title</button>
            {
                show
                ?
                <form className="input-group vertical borrow-form" onSubmit={handleSubmit}>
                    <select className="form-control" onChange={handleChange} name="bookCopyId">
                        <option></option>
                        {books.map((book) => {
                            return book.copies.filter(
                                        (copy) => 
                                            !borrows.find((borrow) => borrow.bookCopyId === copy._id && borrow.status === 1)
                                    )
                                        .map((copy) => (
                                        <option value={copy._id}>{book.author} - {book.title}, ISBN: {book.ISBN}</option>
                            ));
                        })}
                    </select>
                    <select className="form-control" name="readerId" onChange={handleChange}>
                        <option></option>
                        {readers.map((reader) => {
                            return (
                                <option value={reader._id}>{reader.firstName} {reader.lastName}</option>
                            );
                        })}
                    </select>

                    <label htmlFor="dateFrom">Date From</label>
                    <input type="date" name="dateFrom" min="1600-01-01" onChange={handleChange}/>
                    <label htmlFor="dateTo">Date To</label>
                    <input type="date" name="dateTo" min="1600-01-01" onChange={handleChange}/>

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