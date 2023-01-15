import { MOCK_READERS } from "../MockReaders";
const ReadersApi = {
    getAllReaders() {
        return Promise.resolve(MOCK_READERS);
    }
};

export { ReadersApi };