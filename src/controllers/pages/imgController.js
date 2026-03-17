import {prisma} from "../../prisma/prismaClient.js"
import cloudinary from "../../config/cloudinary.js"

export default class imagePages{
    async ReadImages (req,res){

    }
    async CreateImages(req,res){

        const {slug} = req.params
        const images = req.file
     

        try{
        console.log(req.file)
          if(!images){
                 return res.status(400).json({mensagem:"imagem insuficiente"})
            }
            

            const imagensPages = await prisma.paginas.findUnique(
                {
                    where:{slug},include:{pages:true}
                }
            )
                

            if(!imagensPages.publicId){
              
                  if(imagensPages.publicId){
                    await cloudinary.uploader.destroy(imagensPages.publicId)
                  }

                    await prisma.imgPages.deleteMany({
                    where:{
                      paginasId:imagensPages.id
                    }
                })
                   
               }

              

               

              
                const result = await cloudinary.uploader.upload(images.path, {
                    folder:"imagensPages"
                })

                const imagens = [images]
                const url = result.secure_url

              const imagemPages =   await prisma.imgPages.create({
                    data:{
                       url:url,
                       publicId: result.public_id,
                       pages:{
                          connect:{
                              slug
                          }
                       }

                    }
                })

                imagens.push(imagemPages)
                
                 

               return res.status(201).json({url})
            

        } catch (error) {
            return res.status(500).json({mensagem: error.message})
        }
    
    
    }

}
