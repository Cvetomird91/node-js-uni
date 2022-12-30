import BookDetailProps from '../../types/BookDetailProps';

function BookDetail({ book }: BookDetailProps) {
    return (
        <div className="row">
          <div className="col-sm-6">
            <div className="card large">
              <img className="rounded" src={book.cover} alt={book.title} />
              <section className="section dark">
                <h3 className="strong">
                  <strong>{book.title}</strong>
                </h3>
                <p>Author: {book.author}</p>
              </section>
            </div>
          </div>
        </div>
      );
}

export default BookDetail;