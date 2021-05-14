import { mergeResolvers } from "@graphql-tools/merge";
import borrowResolver from "./resolvers/Borrow.js";
import bookResolver from "./resolvers/Book.js";
import readerResolver from "./resolvers/Reader.js";
import userResolver from "./resolvers/User.js";

export default mergeResolvers([borrowResolver, bookResolver, readerResolver, userResolver]);