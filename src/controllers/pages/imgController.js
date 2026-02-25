import {prisma} from "../../prisma/prismaClient.js"
import cloudinary from "../../config/cloudinary.js"

export default class imagePages{
    async ReadImages (req,res){

    }
    async CreateImages(req,res){
        const {slug} = req.body

        const images = req.files
        console.log(req.files)

        try {
            if(!images.lenght){
                 return res.status(400).json({mensagem:"imagem insuficiente"})
            }

            const imagensPages = await prisma.paginas.findMany(
                {
                    where:{slug},include:{pages:true}
                }
            )

            if(imagePages.pages.length > 0 ){
               for(){
                  
               }
            }

            return res.status(200).json(imagensPages)

        } catch (error) {
            
        }
       
         res.status(200).json(images)
    }
}