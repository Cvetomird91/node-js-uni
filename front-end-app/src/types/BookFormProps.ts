import { Book } from './Book'

interface BookFormProps {
    book: Book,
    onCancel: () => void;
}

export default BookFormProps;