"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const client_1 = require("@prisma/client");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class CategoriesController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let categories = yield prisma.categories.findMany({
                where: {
                    id: Number(id),
                }
            });
            let items = yield prisma.items.findMany({
                where: {
                    type: Number(id),
                }
            });
            req.session.category = Number(id);
            if (req.session.category == 1) {
                console.log("фильмы");
                req.session.active = "genre";
            }
            else if (req.session.category == 2) {
                console.log("сериалы");
            }
            else if (req.session.category == 3) {
                console.log("мультфильмы");
            }
            const genres = yield prisma.genres.findMany({});
            const cartoons = yield prisma.cartoonGenres.findMany({});
            res.render('types/index', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                'categories': categories,
                'genres': genres,
                'cartoonGenres': cartoons
            });
        });
    }
    moves(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const genres = yield prisma.genres.findMany({
                where: {
                    name,
                }
            });
            const items = yield prisma.items.findMany({
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)
                }
            });
            let k = 0;
            for (let i = 0; i < items.length; i++) {
                k = k + 1;
            }
            res.render('types/moves', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                'genres': genres,
            });
        });
    }
    cartoons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const genres = yield prisma.cartoonGenres.findMany({
                where: {
                    name
                }
            });
            const items = yield prisma.items.findMany({
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
                active: req.session.active,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
                'cartoonGenres': genres,
            });
        });
    }
    searchFilms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            req.session.searchMove = false;
            const items = yield prisma.items.findMany({
                where: {
                    genre: {
                        contains: name
                    }
                }
            });
            if (items[0] != undefined) {
                req.session.searchMove = true;
            }
            else {
                req.session.searchMove = false;
            }
            console.log(req.session.searchMove);
            res.render('searchHome', {
                'items': items,
                searchMove: req.session.searchMove,
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                mark: req.session.mark
            });
        });
    }
    years(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.session.active = "year";
            const years = yield prisma.years.findMany({});
            res.render('types/years', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'years': years
            });
        });
    }
    ByYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    year: Number(date),
                    type: Number(req.session.category)
                }
            });
            res.render('types/moves', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
            });
        });
    }
    ByGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.session.active = "genre";
            const genres = yield prisma.genres.findMany({});
            const cartoons = yield prisma.cartoonGenres.findMany({});
            res.render('types/index', {
                auth: req.session.auth,
                admin: req.session.admin,
                active: req.session.active,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'genres': genres,
                'cartoonGenres': cartoons
            });
        });
    }
    Country(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            req.session.active = "country";
            const country = yield prisma.country.findMany({});
            res.render('types/country', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'country': country,
            });
        });
    }
    ByCountry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    country: {
                        contains: name
                    },
                }
            });
            res.render('types/moves', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                dark__light: req.session.dark__light,
                category: req.session.category,
                'items': items,
            });
        });
    }
}
exports.CategoriesController = CategoriesController;