import Multer from 'multer'
import path from "path"
import crypto from 'crypto'

const storage = Multer.diskStorage({
         destination: (req,file,cb)=>{
            cb(null, "tmp/")
         },
         filename:(req,file,cd)=>{
              const hash = crypto.randomBytes(10).toString("hex")
              const filename = `${hash} - ${file.originalname}`
              cd(null,filename)
         }
})

export default Multer({storage})