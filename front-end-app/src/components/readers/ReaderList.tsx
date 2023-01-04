import ReaderListProps from "../../types/readers/ReaderListProps";
import { useState } from 'react'
import ReaderCard from "./ReaderCard";
import ReaderForm from "./ReaderForm";
import { Reader } from '../../types/readers/Reader';

function ReaderList({ readers }: ReaderListProps) {
    const [readerBeingEdited, setReaderBeingEdited] = useState({});
    const handleEdit = (reader: Reader) => {
        setReaderBeingEdited(reader);
    }

    const cancelEditing = () => {
        setReaderBeingEdited({});
    }

    return (
        <div className="row">
            {readers.map((reader) => (
                <div className="cols-sm">
                    {reader === readerBeingEdited ? (
                        <ReaderForm onCancel={cancelEditing} reader={reader}/>
                    ) : (
                        <ReaderCard reader={reader} onEdit={handleEdit} />
                    )}
                </div>
            ))}
        </div>
    );

}

export default ReaderList;