import { Router } from "express";
import multer from "./middleware/multer.js";
import users from "./controllers/users/createUsersController.js";
import auth from "./controllers/users/authUsersControoller.js";
import detailsUsers from "./controllers/users/detailsUsers.js";
import pages from "./controllers/pages/pagesController.js";
import { Authentithor } from "./middleware/authenticator.js";
import Upload from "./controllers/upload/imgController.js";
import Room from "./controllers/upload/roomController.js";
import imagePages from "./controllers/pages/imgController.js";

const rotas = Router();
const usuarios = new users();
const Auth = new auth();
const detalhes = new detailsUsers();
const Pages = new pages();
const imagem = new Upload();
const room = new Room();
const ImagePages = new imagePages();

rotas.post('/user',  usuarios.createUsers)
rotas.post("/session", Auth.authenticator)

rotas.get("/detalhes", Authentithor, detalhes.detailsUsers)

rotas.get("/pages/:slug",  Pages.read)
rotas.post("/pages/:slug", Authentithor, Pages.create)
rotas.post('/pagesImg', Authentithor,   multer.array("images"),  ImagePages.CreateImages)

rotas.post("/upload",multer.array("files", 6), Authentithor, imagem.createdimg)
rotas.get("/upload/:tipo",imagem.ReadUploadings )

rotas.post("/room",Authentithor, room.createRoom)
rotas.get("/room/:tipo", room.readingRoom)



export default rotas;