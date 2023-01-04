import ReaderFormProps from "../../types/readers/ReaderFormProps";
import { SyntheticEvent, useState } from 'react';
import { Reader } from '../../types/readers/Reader';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReaderState } from "../../state/readers/ReaderStateTypes";
import { updateReader } from "../../state/readers/ReaderActions";

function ReaderForm({ reader: initialReader, onCancel}: ReaderFormProps) {
    const [reader, setReader] = useState(initialReader);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
    });
    const dispatch = useDispatch<ThunkDispatch<ReaderState, any, AnyAction>>();

    function validate(reader: Reader) {
        let errors: any = { firstName: '', lastName: ''};
        if (reader.firstName.length === 0) {
            errors.firstName = "First name is required";
        }

        if (reader.lastName.length === 0) {
            errors.lastName = "Last name is required";
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
        if (!isValid()) return;
        dispatch(updateReader(reader));
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

        let updatedReader: Reader;

        setReader((reader) => {
            updatedReader = new Reader({...reader, ...change });
            return updatedReader;
        });
        setErrors(() => validate(updatedReader));
    };

    return (
        <form className="input-group vertical reader-form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" placeholder="enter title" value={reader.firstName} onChange={handleChange}/>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" placeholder="enter cover url" value={reader.lastName} onChange={handleChange}/>

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

export default ReaderForm;