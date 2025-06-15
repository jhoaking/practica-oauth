import { Router } from "express"
import passport from 'passport'
export const routerAuth = Router();

routerAuth.get('/login',passport.authenticate('discord')) 

routerAuth.get('/redirect',passport.authenticate('discord',{ 
    successRedirect :'/dashboard',
    failureRedirect: '/'
}))