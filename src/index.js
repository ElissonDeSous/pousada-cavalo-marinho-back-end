import express from 'express'
import rotas from './routes.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000',"https://pousada-cavalo-marinho.vercel.app", 'http://localhost:3001' ,'https://painel-administrativo-cyan.vercel.app'],
    credentials:true
}))
app.use(cookieParser())

app.use(rotas)


app.listen(8080, ()=>{
    console.log('Online')
})