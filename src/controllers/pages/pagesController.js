import {prisma} from '../../prisma/prismaClient.js'
export default class pages{
    async read(req,res){
        const {slug} = req.params

        const dados = await prisma.paginas.findUnique({
            where:{
                slug
            }
        })

        return res.status(200).json(dados)
    }
   async create(req,res){
      const { conteudo} = req.body
      const {slug} = req.params
      
      
       if(conteudo === ""){
             return res.status(400).json({mensagem:"Nada foi Enviado"})
        }
        await prisma.paginas.upsert({
            where:{
               slug
            },
            create:{
                conteudo,
                slug
            },
            update:{
                conteudo
            }
        })

       

        res.status(201).json({mensagem:"Sucesso"})
    }

    
}