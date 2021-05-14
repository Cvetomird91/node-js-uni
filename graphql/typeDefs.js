import { mergeTypeDefs } from "@graphql-tools/merge";
import borrowType from "./types/Borrow.js";
import bookType from "./types/Book.js";
import readerType from "./types/Reader.js";
import userType from "./types/User.js";

export default mergeTypeDefs([borrowType, bookType, readerType, userType]);