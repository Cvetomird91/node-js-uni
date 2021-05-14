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
        addReader: async (root, args, context) => {
            if (!context.authSuccessful) {
                throw(context.error);
            }

            const newReader = new Reader({...args.data, status: 1});
            await newReader.save();
            return newReader;
        },
        editReader: async(root, {_id, data}, context) => {
            if (!context.authSuccessful) {
                throw(context.error);
            }

            const reader = await Reader.findByIdAndUpdate(_id,
                {$set: data},
                {
                    new: true
                });
            return reader;
        },
        deleteReader: async (root, {_id}, context) => {
            if (!context.authSuccessful) {
                throw(context.error);
            }

            //implement soft delete for readers
            const reader = await Reader.findById(_id);
            reader.status = 0;
            await reader.save();
            return reader;
        }
    }
}