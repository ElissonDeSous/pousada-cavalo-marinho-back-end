import {prisma} from "../../prisma/prismaClient.js"


export default class Room{
 async  readingRoom(request,response){
      const {tipo} = request.params
          const data = await prisma.quartos.findFirst({
              where:{
               tipo
              }, select:{
                  id:true,
                  descricao:true
              }
          })

          response.status(200).json(data)
   }
   async createRoom(request,response){
       const {nome,descricao,tipo} = request.body || {}

         if( descricao === ""){
              return response.status(400).json({mensagem:"Quarto não encontrado"})
         }       

         await prisma.quartos.upsert({
            where:{
                   tipo
              },
              create:{
                 nome,
                 descricao,
                 tipo
              },update:{
                 nome,
                 descricao
              }
          })

          response.status(201).json({mensagem:"Sucesso"})
      
     }
}