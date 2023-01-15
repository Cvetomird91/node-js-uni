import { MOCK_BORROWS } from "../MockBorrows";
const BorrowsApi = {
    getBorrows() {
        return Promise.resolve(MOCK_BORROWS);
    }
};

export { BorrowsApi };