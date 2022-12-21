import { useState } from 'react';
import BorrowListProps from '../types/BorrowListProps';

function BorrowList(props: BorrowListProps) {
    const {borrows, readers} = props;

    //todo: refactor the backend to facilitate this relation
    readers.map((reader) => {
        reader.borrows = borrows.filter((borrow) => borrow.reader._id === reader._id);
    })

    return (
        <div className="container">
            <div className="row">
                
                    {readers.map((reader) => (

                        <div className="card">
                            <div className="section">
                                <h5>Reader: {reader.firstName} {reader.lastName}</h5>
                            </div>
                            <div className="section">
                                <h5>Reader status: <mark className={`${reader.status === 0 ? " secondary" : " tertiary"}`}> 
                                    {reader.status === 0 ? "inactive" : "active" } </mark>
                                </h5>
                            </div>
                            {reader.borrows.length !== 0 ? 
                            <div className="section">
                                <ul>
                                {reader.borrows.map((borrow) => (
                                    <li>{borrow.book.author} - {borrow.book.title}, {borrow.book.ISBN}
                                        {borrow.status === 0 ?
                                            <button>Mark returned</button>    
                                        : null}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            : null }
                        </div>
                    ))}
                
            </div>
        </div>
    );
}

export default BorrowList;