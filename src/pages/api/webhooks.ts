import { NextApiRequest, NextApiResponse} from 'next' 

export default  (req: NextApiRequest, res: NextApiResponse) => { 
console.log('é isso ai')

res.status(200).json({ok: true})
}