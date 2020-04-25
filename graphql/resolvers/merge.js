const Codici=require('../../models/codice');
const Commercianti=require('../../models/commerciante');





const codice= codeID=>{
    return Codici.findById(codeID)
    .then( codice => {
        return{...codice._doc,
            _id:codice.id,
            commerciante:commerciante.bind(this,codice._doc.commerciante),
            createdAt: new Date(codice._doc.createdAt).toISOString(),
            updatedAt:new Date(codice._doc.updatedAt).toISOString(),
            validita:new Date(codice._doc.validita).toISOString()            
         }
     })
    .catch(err=>{
        throw err 
    })

}

const codici= codeIDs=>{
    return Codici.find({_id:{$in:codeIDs}}).then(
        codici =>{
            return codici.map(codice=>{
                return {
                    ...codice._doc,
                    _id:codice.id,
                    commerciante:commerciante.bind(this,codice._doc.commerciante),
                    validita:new Date(codice._doc.validita).toISOString()
            }
            })
        }
    ).catch(err=>{
        throw err 
    })

}

const commerciante= commID=>{
    return Commercianti.findById(commID)
    .then( commerciante => {
        return{
            ...commerciante._doc,
            _id:commerciante.id,
            codicisconto:codici.bind(this, commerciante._doc.codicisconto),
            
        }
     })
    .catch(err=>{
        throw err 
    })

}


const transformCommerciante = commerciante => {
    return {
      ...commerciante._doc,
      _id: commerciante.id,
      codicisconto:codici.bind(this, commerciante._doc.codicisconto)
    }
}



const transformCodice = codice => {
    
    return {
      ...codice._doc,
      _id: codice.id,
      commerciante:commerciante.bind(this,codice._doc.commerciante),
      validita: new Date(codice._doc.validita).toISOString()
    }
}







exports.transformCodice=transformCodice;
exports.transformCommerciante=transformCommerciante;
exports.commerciante=commerciante;
exports.codici=codici;
exports.codice=codice;
