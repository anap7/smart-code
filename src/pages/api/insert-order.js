import { getQRCode, saveOrder, getOrder} from '../../services/database';

export default async function handler(req, res) {

  const data = req.body;

  const resultQRCodeVerification = await getQRCode(data?.QRNumber);
  const resultOrderNumberVerification = await getOrder(data?.orderNumber);

  if(!resultQRCodeVerification || resultQRCodeVerification.error || !resultQRCodeVerification?.QRCodeNumber){
    return res.status(404).json({error: 'QRCode não encontrado na base de dados. Por favor, gerar um novo QRCode ou tente novamente.'});
  } 

  if(resultOrderNumberVerification?.orderNumber){
    return res.status(406).json({error: 'Parece que esse número de pedido já está registrado no banco, por favor, inserir um valor válido.'});
  } 

  const newObj = {...data, originalURL: resultQRCodeVerification.originalURL};

  const resultOnRegisterOrder = await saveOrder(newObj);

  if (!resultOnRegisterOrder || resultOnRegisterOrder.error) {
    return res.status(400).json({error: 'Ocorreu um problema ao registrar o novo pedido.'});
  }

  return res.status(200).json({sucess: "Seu pedido foi registrado com sucesso!"});
}
