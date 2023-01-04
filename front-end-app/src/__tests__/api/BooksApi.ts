import { MOCK_BOOKS } from "../__mocks__/MockBooks";
const BooksApi = {
    getAllBooks() {
        return Promise.resolve(MOCK_BOOKS);
    }
}

export { BooksApi };