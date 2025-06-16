import { Router } from "express"
import { isAutorize } from "../utils/auth.js";

export const routerDashboard = Router();



routerDashboard.get('/' ,isAutorize,(req,res) =>{
    
    res.render('dashboard')
}) 