const codeResolver= require('./code');
const commResolver= require('./comm');



const rootResolver={

     ...codeResolver,
    ...commResolver,
    

}


module.exports= rootResolver;