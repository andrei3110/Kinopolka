import { Request, Response } from 'express';
import { items, users, bascet, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class SubscribeController {

    async RenderSubscribe(req: Request, res: Response) {
        
         res.render('subscribe', {
       auth: req.session.auth,
       active:req.session.active,
       admin: req.session.admin,
       status: req.session.status,
       dark__light: req.session.dark__light,
       category: req.session.category,
       
       
   });
    }
}



