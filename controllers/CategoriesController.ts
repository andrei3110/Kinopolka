import { Request, Response } from 'express';
import { items, users, bascet, genres, years, comments, categories, cartoonGenres, country, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class CategoriesController {
    async index(req: Request, res: Response) {
        const { id } = req.params;

        let categories = await prisma.categories.findMany({
            where: {
                id: Number(id),
            }
        });
        let items = await prisma.items.findMany({
            where: {
                type: Number(id),
            }
        });
        req.session.category = Number(id);
        if (req.session.category == 1) {

            req.session.active = "genre"
        } else if (req.session.category == 2) {
            req.session.active = "genre"

        } else if (req.session.category == 3) {
            req.session.active = "genre"

        }

        const genres = await prisma.genres.findMany({})
        const cartoons = await prisma.cartoonGenres.findMany({
        })

        res.render('types/index', {
            auth: req.session.auth,
            active: req.session.active,
            admin: req.session.admin,
            status: req.session.status,
            dark__light: req.session.dark__light,
            category: req.session.category,
            count: req.session.count,
            'items': items,
            'categories': categories,
            'genres': genres,
            'cartoonGenres': cartoons
        });
    }
   async moves(req: Request, res: Response) {
        const { name } = req.params;
       
        const genres =  await prisma.genres.findMany({
            where: {
                name,
            }
        });

        const count = await prisma.items.count({
            where:{
                genre: {
                    contains: name
                },
                type: Number(req.session.category)
            }
        });
        if(count > 0){
            let n = Math.ceil(count / 4)
        req.session.count = Math.ceil(count / 4)

        
        let itemsPerPage = 4
        
        let page =Number(req.query.page) 
        if (!page) page = 1;
        if (page > n) page = n;
        let pages = itemsPerPage * (page - 1)
        const items = await prisma.items.findMany({
            skip: pages,
            take:itemsPerPage,
            where: {
                genre: {
                    contains: name
                },
                type: Number(req.session.category)

            }
        
        });
        console.log(req.session.category)
        let k = 0;
        for (let i = 0; i < items.length; i++) {
            k = k + 1
        }
        res.render('types/moves', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            category: req.session.category,
            count: req.session.count,
            'items': items,
            'genres': genres,
        });
        }else{
            const items = await prisma.items.findMany({
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)
    
                }
            
            });
            res.render('types/moves', {
                auth: req.session.auth,
                active: req.session.active,
                status: req.session.status,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                count: req.session.count,
                'items': items,
                'genres': genres,
            });
        }
      
    }
    async cartoons(req: Request, res: Response) {
        const { name } = req.params;

        const genres = await prisma.cartoonGenres.findMany({
            where: {
                name
            }
        });
        
        const count = await prisma.items.count({
            where:{
                genre: {
                    contains: name
                },
                type: Number(req.session.category)
            }
        });
        if(count > 0){
            let n = Math.ceil(count / 4)
            req.session.count = Math.ceil(count / 4)
            let itemsPerPage = 4
            
            let page =Number(req.query.page) 
            if (!page) page = 1;
            if (page > n) page = n;
            let pages = itemsPerPage * (page - 1)
         
    
            const items = await prisma.items.findMany({
                skip: pages,
                take:itemsPerPage,
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)
    
                }
            
            });
            console.log(req.session.category)
            let k = 0;
            for (let i = 0; i < items.length; i++) {
                k = k + 1
            }
            res.render('types/moves', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                'cartoonGenres': genres,
            });
        }else{
            const items = await prisma.items.findMany({
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)
    
                }
            
            });
            
            res.render('types/moves', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                'cartoonGenres': genres,
            });
        }
       
    }

    async searchFilms(req: Request, res: Response) {
        const { name } = req.body;
        req.session.searchMove = false
        const items = await prisma.items.findMany({
            where: {
                genre: {
                    contains: name
                }
            }
        });
        if (items[0] != undefined) {
            req.session.searchMove = true
        } else {
            req.session.searchMove = false
        }

        console.log(req.session.searchMove)
        res.render('searchHome', {
            'items': items,
            searchMove: req.session.searchMove,
            auth: req.session.auth,
            status: req.session.status,
            count: req.session.count,
            active: req.session.active,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            mark: req.session.mark
        })
    }

    async years(req: Request, res: Response) {
        req.session.active = "year";
        const years = await prisma.years.findMany({

        })
        res.render('types/years', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            count: req.session.count,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            category: req.session.category,
            'years': years
        });
    }
    async ByYear(req: Request, res: Response) {
        const { date } = req.params;
        const currentType = Number(req.session.category)
        const count = await prisma.items.count({
            where: {
                year: Number(date),
                type: Number(req.session.category)

            }
        });
        if(count > 0){
            let n = Math.ceil(count / 4)
            req.session.count = Math.ceil(count / 4)
            let itemsPerPage = 4
            
            let page =Number(req.query.page) 
            if (!page) page = 1;
            if (page > n) page = n;
            let pages = itemsPerPage * (page - 1)
         
    
            const items = await prisma.items.findMany({
                skip: pages,
                take:itemsPerPage,
                where: {
                    year: Number(date),
                    type: Number(req.session.category)
    
                }
            
            });
            console.log(req.session.category)
            let k = 0;
            for (let i = 0; i < items.length; i++) {
                k = k + 1
            }
            res.render('types/moves', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                
            });
        }else{
            const items = await prisma.items.findMany({
                where: {
                    year: Number(date),
                    type: Number(req.session.category)
    
                }
            
            });
            
            res.render('types/moves', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                
            });
        }
    }
    async ByGenre(req: Request, res: Response) {
        const { id } = req.params;
        req.session.active = "genre";
        const genres = await prisma.genres.findMany({

        })
        const cartoons = await prisma.cartoonGenres.findMany({

        })
        res.render('types/index', {
            auth: req.session.auth,
            count: req.session.count,
            status: req.session.status,
            admin: req.session.admin,
            active: req.session.active,
            dark__light: req.session.dark__light,
            category: req.session.category,

            'genres': genres,
            'cartoonGenres': cartoons
        });
    }

    async Country(req: Request, res: Response) {
        const { name } = req.params;
        req.session.active = "country";
        const country = await prisma.country.findMany({

        });
        res.render('types/country', {
            auth: req.session.auth,
            count: req.session.count,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            category: req.session.category,
            'country': country,
        });
    }
    async ByCountry(req: Request, res: Response) {
        const { name } = req.params;
        const currentType = Number(req.session.category)
        const count = await prisma.items.count({
            where: {
                country: {
                    contains: name
                },
                type:currentType
            }
        });
        if(count > 0){
            let n = Math.ceil(count / 4)
            req.session.count = Math.ceil(count / 4)
            let itemsPerPage = 4
            
            let page =Number(req.query.page) 
            if (!page) page = 1;
            if (page > n) page = n;
            let pages = itemsPerPage * (page - 1)
         
    
            const items = await prisma.items.findMany({
                skip: pages,
                take:itemsPerPage,
                where: {
                    country: {
                        contains: name
                    },
                    type:currentType
                }
            
            });
            console.log(req.session.category)
            let k = 0;
            for (let i = 0; i < items.length; i++) {
                k = k + 1
            }
            res.render('types/moves', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                
            });
        }else{
            const items = await prisma.items.findMany({
                where: {
                    country: {
                        contains: name
                    },
                    type:currentType
                }
            
            });
            
            res.render('types/moves', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                
            });
        }
        
    }
}



