import axios from "axios";
export default class Analizar{
    async analytics (req,res){
         try {
            const Token = "y0__xCVztHgCBj3oj8gu5XS6RZiB30syMzaTB5yMOSzki-4O31SSw"


            const response = await axios.get("https://api-metrica.yandex.net/stat/v1/data", {
                 headers:{
                    Authorization: `OAuth ${Token}`
                 },
                 params:{
                    ids:'108171423',
                    metrics: 'ym:s:visits',
                    dimensions: 'ym:s:date',
                    date1: '7daysAgo',
                     date2: 'today',
                 }
            })

           return res.status(200).json(response.data)
        
         } catch (error) {
           return res.status(500).json({mensagem: error.message})
         }
    }
}