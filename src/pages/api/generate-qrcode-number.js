import { generateQRCodeNumber } from '../../services/database';

export default async function handler(req, res) {
  
  const result = await generateQRCodeNumber();

  if(!result|| result.error){
    return res.status(404).json({'message':'Not Found'});
  }

  return res.status(200).json(result);
}
