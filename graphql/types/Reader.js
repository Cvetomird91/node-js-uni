export default `

    input ReaderInput {
        firstName: String!
        lastName: String!
    }

    type Reader {
        _id: String!
        firstName: String!
        lastName: String!
        status: Int
    }

    type Query {
        reader(_id: String!): Reader
        readers: [Reader]
    }

    type Mutation {
        addReader(data: ReaderInput!): Reader
    }
`
/*
        editReader(_id: String!, data: ReaderInput!): Reader
        deleteReader(_id: String!): Reader

*/