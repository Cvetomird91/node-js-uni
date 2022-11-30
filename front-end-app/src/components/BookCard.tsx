import Book from '../types/Book';
import BookCardProps from '../types/BookCardProps';


function BookCard(props: BookCardProps) {
  const { book, onEdit } = props;

  const handleEditClick = (bookBeingEdited: Book) => {
    onEdit(bookBeingEdited);
  }

  return (
    <div className="card">
      <img src={book.cover} alt={book.title} />
      <section className="section dark">
        <h5 className="strong">
        <strong>{book.title}</strong>
        </h5>
        <div><i>{book.author}</i></div>
        <div><i>{book.ISBN}</i></div>
        <div><i>{book.date}</i></div>
        <div>
          <button
            className=" bordered" onClick={() => {
              handleEditClick(book);
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
  
export default BookCard;