const mongoose =require('mongoose');

const Schema = mongoose.Schema;//constructor function of mongoose to generate schema objects
//ci garantiamo che tutte gli oggetti room siano cosi
const commercianteSchema = new Schema ({
    title: {
        type:String,
        require:true
    },
    
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    codicisconto:[{
        type: Schema.Types.ObjectId,
        ref: 'Codice'//let mongoose know that the data are connected to another model
    }]     
})
module.exports= mongoose.model('Commerciante', commercianteSchema); //2 argomenti il nome e lo schema che usa