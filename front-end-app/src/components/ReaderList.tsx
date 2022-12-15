import ReaderListProps from "../types/ReaderListProps";
import { useState } from 'react'
import ReaderCard from "./ReaderCard";

function ReaderList({ readers }: ReaderListProps) {
    const [readerBeingEdited, setReaderBeingEdited] = useState({});

    return (
        <div className="row">
            {readers.map((reader) => (
                <div className="cols-sm">
                    <ReaderCard reader={reader} />
                </div>
            ))}
        </div>
    );

}

export default ReaderList;