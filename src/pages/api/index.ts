import {NextApiRequest,NextApiResponse} from 'next'

export default(request:NextApiRequest,response:NextApiResponse) => {
const users = [
    {id:1, name:'Caio'},
    {id:1, name:'Diego'},
    {id:1, name:'Dani'},
]
return response.json(users)
}