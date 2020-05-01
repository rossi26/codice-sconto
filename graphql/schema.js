const { buildSchema } =require('graphql');



module.exports = buildSchema(`
           

        type Commerciante {
            _id: ID!
            title: String!
            email: String!
            password:String
            codicisconto:[CodiceSconto!]
        }

    
        type CodiceSconto {
            _id: ID!
            code: String!
            entitasconto:String!
            messaggio:String!
            commerciante:Commerciante!
            validita: Int!
           
        }
       

        type AuthData{
            commId: ID!
            token: String!
            tokenExpiration: Int!
        }

        input CommInput {
            title: String!
            email: String!
            password:String!
          
        }

       
        input DiscountInput {
           
            entitasconto:String!
            messaggio:String!
            validita: Int!

        }
       

        type RootQuery{
            codici: [CodiceSconto!]
            commercianti:[Commerciante!]
            commerciante:Commerciante!
            login(email: String!, password:String!): AuthData!
        }

        type RootMutation{
            createComm(commInput: CommInput): Commerciante
            cancelCode(codeId:String!): Commerciante!
            createCode(codeInput:DiscountInput):CodiceSconto
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
        
    `)

   