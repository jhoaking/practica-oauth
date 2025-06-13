import { Router } from "express"

export const routerDashboard = Router();



routerDashboard.get('/dashboard' ,(req,res) =>{
    res.send('dashboard')
})