import ReaderCardProps from "../types/ReaderCardProps";
import { Reader } from '../types/Reader';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { SyntheticEvent } from 'react';
import { ReaderState } from '../state/ReaderStateTypes';

function ReaderCard(props: ReaderCardProps) {
    const { reader, onEdit } = props;

    const handleEditClick = (readerBeingEdited: Reader) => {
      onEdit(readerBeingEdited);
    }

    const dispatch = useDispatch<ThunkDispatch<ReaderState, any, AnyAction>>();

    return (
        <div className="card">
          <section className="section dark">
            <div><i>First Name: {reader.firstName}</i></div>
            <div><i>Last Name: {reader.lastName}</i></div>
            <div><i>Status: {reader.status == 0 ? "Disabled" : "Enabled" }</i></div>
            <div>
              <button
                className=" bordered" onClick={() => {
                  handleEditClick(reader);
                }}
              >
                <span className="icon-edit "></span>
                Edit
              </button>
          </div>
          </section>
        </div>
      )
}

export default ReaderCard;