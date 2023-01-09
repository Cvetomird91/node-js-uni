import { MOCK_BOOKS } from "../MockBooks";
const BooksApi = {
    getAllBooks() {
        return Promise.resolve(MOCK_BOOKS);
    }
}

export { BooksApi };