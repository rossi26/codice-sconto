const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        req.isAuth=false;
        return next();
    }
    const token=authHeader.split('Bearer')[1];
    if(!token || token===''){
        req.isAuth=false;
        return next();
    }
    let decodenToken;
    try{
        decodenToken=jwt.verify(token, 'noninotoro');
    }
    catch(err){
        req.isAuth=false;
        return next();
    }
    if(!decodenToken){
        req.isAuth=false;
        return next();
    }
    req.isAuth= true;
    req.commId= decodenToken.commId;
    next();
} 