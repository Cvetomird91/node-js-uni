export default `

    type Mutation {
        login(email: String!, password: String!): String
        logout(email: String!): String
    }

`