const mongoose =require('mongoose');

const Schema = mongoose.Schema;//constructor function of mongoose to generate schema objects
//ci garantiamo che tutte gli oggetti room siano cosi
const codeSchema = new Schema ({
    code: {
        type:String,
        require:true
    },
    entitasconto: {
        type:String,
        require:true
    },
    messaggio: {
        type:String,
        require:true
    },
    commerciante:{
        type:Schema.Types.ObjectId,
        ref: 'Commerciante'
    },
    validita: {
        type:Date,
        require:true
    }
            
})
module.exports= mongoose.model('Codice', codeSchema); //2 argomenti il nome e lo schema che usa