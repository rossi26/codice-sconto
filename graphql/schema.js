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
            validita: String!
           
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
            code: String!
            entitasconto:String!
            messaggio:String!
            validita: String!

        }
       

        type RootQuery{
            codici: [CodiceSconto!]
            commercianti:[Commerciante!]
            commerciante:Commerciante!
            login(email: String!, password:String!): AuthData!
        }

        type RootMutation{
            createComm(commInput: CommInput): Commerciante
            cancelCode(codeId:String!): CodiceSconto!
            createCode(codeInput:DiscountInput):CodiceSconto
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
        
    `)

   