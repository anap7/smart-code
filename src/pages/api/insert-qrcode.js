import { saveQRCode } from '../../services/database';

export default async function handler(req, res) {
  
  const data = req.body;

  const result = await saveQRCode(data);

  if(!result.acknowledged || result.error){
    return res.status(404).json({'message':'Not Found'});
  }

  return res.status(200).json({"tudoCerto": "Tudo certo"});
}
