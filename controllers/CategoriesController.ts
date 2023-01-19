import { Request, Response } from 'express';
import { items, users, bascet,genres, years,comments,categories,cartoonGenres,country, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class CategoriesController {
    async index(req: Request, res: Response) {
         const {id} = req.params;
         req.session.category = 1;
        let categories = await prisma.categories.findMany({
            where: {
               id:Number(id),
            }
        });
        let items = await prisma.items.findMany({
            where: {
               type:Number(id),
            }
        });
        req.session.category = Number(id);
        if(req.session.category == 1){
            console.log("фильмы")
            req.session.active = "genre"
        } else if(req.session.category==2){
            console.log("сериалы")
        } else if(req.session.category == 3){
            console.log("мультфильмы")
        }
       
        const genres = await prisma.genres.findMany({})
        const cartoons = await prisma.cartoonGenres.findMany({
        })

        res.render('types/index', {
            auth: req.session.auth,
            active:req.session.active,
            admin: req.session.admin,
            dark__light: req.session.dark__light,
            category: req.session.category,
            'items': items,
            'categories': categories,
            'genres' : genres,
            'cartoonGenres' : cartoons
        });
    }
    async moves(req: Request, res: Response) {
        const {name} = req.params;
       const genres = await prisma.genres.findMany({
        where: {
           name,
        }
    });
      const items = await prisma.items.findMany({
     where: {
         genre: {
             contains: name 
         },
         type: Number(req.session.category)

     }

 });
 let k = 0;
    for(let i = 0;i< items.length; i++){
        k= k+1
    }
       res.render('types/moves', {
           auth: req.session.auth,
           active:req.session.active,
           admin: req.session.admin,
           dark__light: req.session.dark__light,
           category: req.session.category,
           'items': items,
           'genres': genres,
       });
   }
   async cartoons(req: Request, res: Response) {
    const {name} = req.params;
    
   const genres = await prisma.cartoonGenres.findMany({
    where: {
       name
    }
});
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
       admin: req.session.admin,
       active:req.session.active,
       dark__light: req.session.dark__light,
       category: req.session.category,
       'items': items,
       'cartoonGenres': genres,
   });
}

async searchFilms(req: Request, res: Response) {
    const { name } = req.body;
    req.session.searchMove = false
    const items = await prisma.items.findMany({
        where: {
            genre:{
                contains: name
            }
        }
    });
    if(items[0] != undefined){
        req.session.searchMove = true
    }else{
        req.session.searchMove = false
    }
    
    console.log(req.session.searchMove)
    res.render('searchHome',{
        'items': items,
        searchMove:req.session.searchMove,
        auth: req.session.auth,
        active:req.session.active,
        admin: req.session.admin,
        dark__light: req.session.dark__light,
        mark: req.session.mark
    })
}

async years(req: Request, res: Response) {
    const {id} = req.params;
    req.session.active = "year";
   const years = await prisma.years.findMany({
       
   })
   res.render('types/years', {
       auth: req.session.auth,
       active:req.session.active,
       admin: req.session.admin,
       dark__light: req.session.dark__light,
       category: req.session.category,
       'years':years
   });
}
async ByYear(req: Request, res: Response) {
    const {date} = req.params;
    
  const items = await prisma.items.findMany({
 where: {
     year:Number(date),
     type: Number(req.session.category)

 }
 
});
   res.render('types/moves', {
       auth: req.session.auth,
       active:req.session.active,
       admin: req.session.admin,
       dark__light: req.session.dark__light,
       category: req.session.category,
       'items': items,
       
   });
}
async ByGenre(req: Request, res: Response) {
    const {id} = req.params;
    req.session.active = "genre";
   const genres = await prisma.genres.findMany({
       
   })
   const cartoons = await prisma.cartoonGenres.findMany({
       
   })
   res.render('types/index', {
       auth: req.session.auth,
       admin: req.session.admin,
       active:req.session.active,
       dark__light: req.session.dark__light,
       category: req.session.category,
       
       'genres' : genres,
       'cartoonGenres' : cartoons
   });
}

async Country(req: Request, res: Response) {
    const {name} = req.params;
    req.session.active = "country";
  const country = await prisma.country.findMany({

});
   res.render('types/country', {
       auth: req.session.auth,
       active:req.session.active,
       admin: req.session.admin,
       dark__light: req.session.dark__light,
       category: req.session.category,
       'country': country,  
   });
}
async ByCountry(req: Request, res: Response) {
    const {name} = req.params;

    const items = await prisma.items.findMany({
        where: {
            country: {
                contains: name 
            },
        }
       });
   res.render('types/moves', {
       auth: req.session.auth,
       active:req.session.active,
       admin: req.session.admin,
       dark__light: req.session.dark__light,
       category: req.session.category,
       'items': items,
       
   });
}
}



