import Reader from "../../models/Reader.js";

export default {
    Query: {
        readers: async () => {
            const readers = await Reader.find({});
            return readers;
        },
        reader: async (root, {_id}) => {
            const reader = await Reader.findById(_id);
            return reader;
        }
    },
    Mutation: {
        addReader: async (root, args) => {
            const newReader = new Reader({...args.data, status: 1});
            await newReader.save();
            return newReader;
        },
        editReader: async(root, {_id, data}) => {
            const reader = await Reader.findByIdAndUpdate(_id,
                {$set: data},
                {
                    new: true
                });
            return reader;
        },
        deleteReader: async (root, {_id}) => {
            //implement soft delete for readers
            const reader = await Reader.findById(_id);
            reader.status = 0;
            await reader.save();
            return reader;
        }
    }
}