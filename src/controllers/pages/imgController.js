import {prisma} from "../../prisma/prismaClient.js"
import cloudinary from "../../config/cloudinary.js"

export default class imagePages{
    async ReadImages (req,res){

    }
    async CreateImages(req,res){

        const {slug} = req.body
        const images = req.files
        console.log(req.files)
          if(!images || images.length === 0){
                 return res.status(400).json({mensagem:"imagem insuficiente"})
            }
            

            const imagensPages = await prisma.paginas.findFirst(
                {
                    where:{slug},include:{pages:true}
                }
            )
                

            if(imagensPages.pages.length > 0 ){
               for(const img of imagensPages.pages){
                  if(img.publicId){
                    await cloudinary.uploader.destroy(img.publicId)
                  }
                   
               }

                await prisma.imgPages.deleteMany({
                    where:{
                      paginasId:imagensPages.id
                    }
                })

               }

               for(const image of images){
                const result = await cloudinary.uploader.upload(image.path, {
                    folder:"imagensPages"
                })

                const imagens = [image]

              const imagemPages =   await prisma.imgPages.create({
                    data:{
                       url:result.secure_url,
                       publicId: result.public_id,
                       pages:{
                          connect:{
                              slug
                          }
                       }

                    }
                })

                imagens.push(imagemPages)
                 return res.status(200).json(imagens)
               }
            
         

           

        } catch (error) {
            return res.status(500).json({mensagem: error.message})
        }
    
    }


