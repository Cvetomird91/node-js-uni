import { Book } from './Book'

interface BookFormProps {
    book: Book,
    onSave: (book: Book) => void;
    onCancel: () => void;
}

export default BookFormProps;