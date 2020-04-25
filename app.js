const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');//lo usiamo dove express si aspetta una middleware function prende le richeste in ingresso le passa a graphql
const graphQlSchema= require('./graphql/schema');
const graphQlResolvers= require('./graphql/resolvers/resolvers');
const mongoose=require('mongoose');
const isAuth=require('./middleware/is-auth')


const app= express();

app.use(bodyParser.json());

app.use((req,res,next)=>{//autorrizzare cross origin request
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','POST,GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    if(req.method=='OPTIONS'){
        return res.sendStatus(200)
    }
    next();
})

app.use(isAuth)


const PORT=process.env.PORT || 5000;

app.use('/graphql',graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql:true
}))//gestisce le richieste che arrivano all'endpoint tramite la middleware function che ha bisogno di sapere dove trova lo schema e dove trova i resolver




mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-mslvb.mongodb.net/test?retryWrites=true&w=majority`,{
    useNewUrlParser: true
}).
then(()=>{
    app.listen(PORT);
}).catch(err=>{
    console.log(err);
})