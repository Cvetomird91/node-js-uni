import { Book } from '../types/Book';

export function BookCard({image, title, date, author, isbn, description }: Book) {
  return (
    <div className="card book-card">
      <img className="card-img-top vertical-style-image"
        alt="Card image cap" src={image}/>
        <div className="card-body">
            <div className="text-center book-edit-modal-button-holder">
                <button type="button" className="btn btn-primary text-center" data-toggle="modal" data-target="#book-edit-modal-1">Edit</button>
            </div>
            <h5 className="card-title vertical-style-title">{title}</h5>
            <p className="card-text vertical-style-date">{date}</p>
            <p className="card-text">{author}</p>
            <p className="card-text isbn">{isbn}</p>
            <br/>
            <p className="card-text vertical-style-description">{description}</p>
        </div>
    </div>
  )
}

export default BookCard
