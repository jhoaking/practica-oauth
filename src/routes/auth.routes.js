import { Router } from "express"

export const routerAuth = Router();

routerAuth.get('/auth' ,(req,res) =>{
    res.send('login')
})