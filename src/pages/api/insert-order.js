import { getQRCode, getOrder, attachedOrder} from '../../services/database';
import { createCompletedDate } from '../../services/helpers'

export default async function handler(req, res) {
  
  const data = req.body;
  let searchObj = {};
  let id = '';
  let qrcode = '';
  let codeNumber = '';

  if (data.type === "url") {
    searchObj = { originalURL: data?.submitValues?.qrCodeValue }
  } else {
    searchObj = { codeNumber: data?.submitValues?.qrCodeValue }
  }

  const resultQRCodeVerification = await getQRCode(searchObj);

  const resultOrderNumberVerification = await getOrder(data?.submitValues?.orderNumber);

  if (resultOrderNumberVerification?.orderNumber) {
    return res.status(406).json({ error: 'Parece que esse número de pedido já está registrado no banco, por favor, inserir um valor válido.' });
  }

  if (!resultQRCodeVerification || resultQRCodeVerification.error || (!resultQRCodeVerification?.QRCode && !resultQRCodeVerification?.codeNumber)) {
    return res.status(404).json({ error: 'QRCode não encontrado na base de dados. Por favor, gerar um novo QRCode ou tente novamente.' });
  }

  if (resultQRCodeVerification?.orderNumber) {
    return res.status(406).json({ error: `Esse pedido já está associado ao número ${resultQRCodeVerification?.orderNumber}, por favor, para mudar o número do pedido acesse a página de alterar pedido.` });
  }

  if (resultQRCodeVerification?._id) {
    id = resultQRCodeVerification?._id.toString();
    qrcode = resultQRCodeVerification?.originalQRCode;
    codeNumber = resultQRCodeVerification?.codeNumber;
  } 

  delete data.submitValues.qrCodeValue;

  const newObj = {
    ...data.submitValues
  };

  const resultOnRegisterOrder = await attachedOrder(newObj, id);

  if (!resultOnRegisterOrder?.lastErrorObject?.n) {
    return res.status(404).json({ error: 'Ocorreu um problema ao associar o pedido, tente novamente!' });
  }

  if(resultOnRegisterOrder?.lastErrorObject?.n > 0) {
    return res.status(200).json({ sucess: 'Pedido atualizado com sucesso!', originalQRCode: qrcode, codeNumber: codeNumber, newOrderNumber: data?.submitValues?.orderNumber });
  }
}
