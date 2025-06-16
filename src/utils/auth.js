export function isAutorize(req,res,next){
    if(req.user){
        next()
    }else {
        res.redirect('/home')
    }
}

export function isNotAutorize(req,res,next) {
    if(req.user){
        res.redirect('/dashboard');
    }else {
        next();
    }
}