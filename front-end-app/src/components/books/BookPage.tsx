import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../../types/Book';
import { BookApi } from '../../graphql/BooksApi';
import BookDetail from './BookDetail';

function BookPage() {
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = params.id;
  
    useEffect(() => {
        setLoading(true);
        BookApi
          .getBook(id)
          .then((data) => {
            setBook(data);
            setLoading(false);
          })
          .catch((e) => {
            setError(e);
            setLoading(false);
          });
      }, [id]);

    return (
        <div>
        <>
          <h1>Book Detail</h1>
  
          {loading && (
            <div className="center-page">
              <span className="spinner primary"></span>
              <p>Loading...</p>
            </div>
          )}
  
          {error && (
            <div className="row">
              <div className="card large error">
                <section>
                  <p>
                    <span className="icon-alert inverse "></span> {error}
                  </p>
                </section>
              </div>
            </div>
          )}

          {book && <BookDetail book={book} />}

        </>
      </div>
    );
}

export default BookPage;