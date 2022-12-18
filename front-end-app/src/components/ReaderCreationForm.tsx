import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReaderState } from '../state/ReaderStateTypes';
import Reader from '../types/Reader';
import { addReader } from '../state/ReaderActions';

function ReaderCreationForm() {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: ''
    });
    const dispatch = useDispatch<ThunkDispatch<ReaderState, any, AnyAction>>();

    function validate(reader: Reader) {
        let errors: any = { firstName: '', lastName: ''};
        if (reader.firstName.length === 0) {
            errors.cover = 'Cover is required.';
        }

        if (reader.lastName.length === 0) {
            errors.author = 'Author is required.';
        }

        return errors;
    }

    function isValid() {
        return (
            errors.firstName.length === 0 &&
            errors.lastName.length === 0
        );
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const reader: Reader = new Reader({firstName, lastName});
        setErrors(() => validate(reader));
        if (!isValid()) return;
        dispatch(addReader(reader));
        setShow(false);
    }

    return (
        <div className="reader-creation-form">
            <button className="primary" onClick={() => setShow(!show)}>Add reader</button>
            {
                show ?
                <form className="input-group vertical book-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" placeholder="enter title" onChange={(event) => {setFirstName(event.target.value)}}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" placeholder="enter cover url" onChange={(event) => {setLastName(event.target.value)}}/>

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

export default ReaderCreationForm;