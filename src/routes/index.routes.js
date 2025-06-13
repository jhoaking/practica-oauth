import { Router } from "express"

export const routerApp = Router();

routerApp.get('/' ,(req,res) =>{
    res.render('home')
})
 