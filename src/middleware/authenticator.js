
import jwt from 'jsonwebtoken'

export  function Authentithor(req,res,next){
     const token = req.cookies.token
    


     if(!token){
        return res.status(401).json({mensagem:"Token não encontrado"})
     }

     try {
        const verificar = jwt.verify(token, process.env.SECRET_SIGNATURE)

        req.id = verificar.id

        console.log(req.id)
        next();
     } catch (error) {
        return res.status(401).json({mensagem:"token invalido"})
     }
     
}