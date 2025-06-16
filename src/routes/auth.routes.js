import { Router } from "express"
import passport from 'passport'
import { isNotAutorize } from "../utils/auth.js";
export const routerAuth = Router();

routerAuth.get('/login',isNotAutorize,  passport.authenticate('discord')) 

routerAuth.get('/redirect',passport.authenticate('discord',{ 
    successRedirect :'/dashboard',
    failureRedirect: '/'
}))

routerAuth.get('/logout',(req,res) =>{
    if(req.user)req.logOut()
    
        res.redirect('/home')
})