'use strict';

module.exports = (capability) => (req,res,next) => {
    try{
        if(req.user.capabilities.include(capability)) next();
        else next('You are not authorized for this functionality');
    } catch(e){
        next('invalid Login, (acl middleWare)');
    }
}