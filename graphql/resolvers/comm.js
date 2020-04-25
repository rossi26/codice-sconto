const Commercianti=require('../../models/commerciante');
const bcrypt=require('bcryptjs');
const{codici}= require('./merge');
const{transformCommerciante}= require('./merge');
const jwt= require('jsonwebtoken');


module.exports= {
    
    
    commercianti: async (args,req)=>{   
      /*   if(!req.isAuth){
            throw new Error('Unauthenticated')
        }  */
        try {
            const commercianti = await Commercianti.find();
            return commercianti.map(commerciante => {
              return transformCommerciante(commerciante);
            });
          } catch (err) {
            throw err;
          }//questa funzione verra chiamata quando le richieste in ingresso cercheranno events property
       
    },
    commerciante: async (args,req)=>{   
       /*  if(!req.isAuth){
            throw new Error('Unauthenticated')
        }  */
        try {
            const commerciante = await Hotel.findById(req.commId);
            
              return transformHotel(commerciante);
           
          } catch (err) {
            throw err;
          }//questa funzione verra chiamata quando le richieste in ingresso cercheranno commerciante
       
    },


    createComm: (args,req)=>{
       
       return Commercianti.findOne({email: args.commInput.email})
        .then(comm=>{
            if (comm){
            throw new Error('Hotel exists already')
            }
            return bcrypt.hash(args.commInput.password,12)
        })
        .then(hashedPassword=>{
            const comm= new Commercianti({
                title:args.commInput.title,
                email:args.commInput.email,
                password:hashedPassword
               
            });

            return comm.save().then(res=>{
                console.log(res)
                return {...res._doc,password:null, _id:res.id, codicisconto:codici.bind(this, res._doc.codicisconto)}
            }).catch(err=>{
                console.log(err)
                throw err;
            });
        })
        .catch(err=>{
            console.log(err)
            throw err;
        })

       
        
        

    },

    login: async ({email, password})=>{
 
        const comm= await Commercianti.findOne({email:email});
        if(!comm){
            throw new Error('invalid credential');
        }
        const isEqual= await bcrypt.compare(password, comm.password);
        if(!isEqual){
            throw new Error('invalid credential');
        }
        const token= jwt.sign({commId: comm.id, email: comm.email }, 'noninotoro',{
            expiresIn: '1h'
        });//primo argomento quello che voglio secondo stringa to hash token
        return { commId: comm.id, token: token, tokenExpiration: 1}

    }



    

     
}