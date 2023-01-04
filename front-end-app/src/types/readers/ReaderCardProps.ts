import { Reader } from "./Reader";

interface ReaderCardProps {
    reader: Reader;
    onEdit: (reader: Reader) => void;
}

export default ReaderCardProps;