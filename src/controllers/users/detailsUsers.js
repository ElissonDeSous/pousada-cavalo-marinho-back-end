import {prisma} from '../../prisma/prismaClient.js'
export default class detailsUsers{
    async detailsUsers(req,res){
         const idVerificado = req.id

         const dados = await prisma.users.findMany({
            where:{
               id:idVerificado
            },select:{
                id:true,
                name: true
            }
         })

         return res.status(200).json(dados)


    }
}