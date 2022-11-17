import { AddBookButton } from "./AddBookButton";
import { BookSortingSelect } from "./BookSortingSelect";

export function BookCatalogMenu () {
  return (
    <div className="row justify-content-between books-button-holder">
      <AddBookButton/>
      <BookSortingSelect/>
    </div>
  )
}
