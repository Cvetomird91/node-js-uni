import ReaderCardProps from "../../types/readers/ReaderCardProps";
import { Reader } from '../../types/readers/Reader';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { SyntheticEvent } from 'react';
import { ReaderState } from '../../state/readers/ReaderStateTypes';
import { deleteReader } from '../../state/readers/ReaderActions';

function ReaderCard(props: ReaderCardProps) {
    const { reader, onEdit } = props;

    const handleEditClick = (readerBeingEdited: Reader) => {
      onEdit(readerBeingEdited);
    }

    const dispatch = useDispatch<ThunkDispatch<ReaderState, any, AnyAction>>();
    const disableReaderClick = (event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(deleteReader(reader))
    }

    return (
        <div className="card">
          <section className="section dark">
            <div><i>First Name: {reader.firstName}</i></div>
            <div><i>Last Name: {reader.lastName}</i></div>
            <div><i>Status: {reader.status === 0 ? "Disabled" : "Enabled" }</i></div>
            <div>
              <button
                className=" bordered" onClick={() => {
                  handleEditClick(reader);
                }}
              >
                <span className="icon-edit "></span>
                Edit
              </button>
              {reader.status === 1 ?
              <button className="bordered" onClick={disableReaderClick}>
                Disable user
              </button>
              :null }
          </div>
          </section>
        </div>
      )
}

export default ReaderCard;