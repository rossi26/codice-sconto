const Codici=require('../../models/codice');
const{transformCodice}= require('./merge');
const Commercianti=require('../../models/commerciante');
const{commerciante}= require('./merge');
const {transformCommerciante}= require('./merge');



module.exports= {
    codici: async (args,req)=>{    
        try {
           /*  if(!req.isAuth){
                throw new Error('Unauthenticated')
            } */
            const codici = await Codici.find({commerciante:{$in:req.commId}});
            return codici.map(codice => {
              return transformCodice(codice);
            });
          } catch (err) {
            throw err;
          }//questa funzione verra chiamata quando le richieste in ingresso cercheranno events property
       
    },

   createCode: async (args,req)=>{
      /*  if(!req.isAuth){
           throw new Error('Unauthenticated')
       } */
       const codici = await Codici.find({commerciante:{$in:req.commId}});
 
    
    

   

    function createRandomString(length) {
        
        var str = '';
        for ( ; str.length < length; str += Math.random().toString(36).substr(2) );
        return str.substr(0, length);
    }

        let code = createRandomString(7)

        
        let i=0
        console.log(codici, code)

        console.log(!codici.includes(code)||i>100)

        for(i=0;codici.includes(code)||i<100;i++){
            code=createRandomString(7)
        }
    
       



        const codice= new Codici({
            code: code,
            entitasconto:args.codeInput.entitasconto,
            messaggio:args.codeInput.messaggio,
            validita:args.codeInput.validita,
            commerciante:req.commId
        })
        let createdCode
        return codice.save().then(res=>{
            createdCode = {...res._doc, _id:res.id, commerciante:commerciante.bind(this,res._doc.commerciante)}
            return Commercianti.findById(req.commId)
            
        })
        .then(commerciante=>{
            if (!commerciante){
                throw new Error('Hotel doesnt exists already')
            }
            commerciante.codicisconto.push(codice);
            return commerciante.save()

        })
        .then(result=>{
            return createdCode;
        })
        .catch(err=>{
            console.log(err)
            throw err;
        });
        

    },
    cancelCode: async args=>{
        try{

            const codici= await Codici.findById(args.codeId)
            const commupdate= await Commercianti.findById(codici.commerciante)
            const val =codici.validita
            if (!commupdate) {
                throw new Error('Commerciante not found.');
              }
              const commupdate1= {
                  ...commupdate._doc
              }

            if(val>1){
                
                await Codici.updateOne({_id:args.codeId},{$set:{"validita": val-1}})
                 return  transformCommerciante(commupdate)




            }
            
            
            
            
            
              
              commupdate1.codicisconto.pull(codici);
              await commupdate.save();
            
          await Codici.deleteOne({_id:args.codeId})
          return  transformCommerciante(commupdate)
         


        }catch(err){
            throw err
       }   
    }


   


}