import { SyntheticEvent } from 'react';
import { returnBookCopy } from '../../state/borrows/BorrowActions';
import BorrowReturnButtonProps from '../../types/borrows/BorrowReturnButtonProps';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BorrowState } from '../../state/borrows/BorrowStateTypes';

function BorrowReturnButton(props: BorrowReturnButtonProps) {
    const { borrow } = props;
    const dispatch = useDispatch<ThunkDispatch<BorrowState, any, AnyAction>>();

    const markAsReturned = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(returnBookCopy(borrow))
    }

    return (
        <button onClick={markAsReturned}>Mark returned</button>
    );
}

export default BorrowReturnButton;