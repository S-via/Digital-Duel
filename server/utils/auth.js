const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';
const expiration = '2hr';

module.exports = {
    authMiddleware: function({req}){
        let token = req.body||req.query.token||req.headers.authorization;

        if(req.headers.authorization){
            token = token.split('').pop().trim();
        }
        if(!token){
            return req;
        }
        try{
            const{data} = jwt.verify(token,secret,{maxAge:expiration});
            req.user= data;
        } catch(error){
            console.log('not valid');
        }
        return req;
    },
    signToken: function({username,email,_id}){
        const payload ={username,email,_id};

        return jwt.sign({data:payload},secret,{expiresIn:expiration});
    }
}