import { getQRCode, saveOrder, getOrder } from '../../services/database';
import QRCode from 'qrcode';

export default async function handler(req, res) {

  const data = req.body;
  let searchObj = {};

  if (data.type === "url") {
    searchObj = { originalURL: data?.submitValues?.qrCodeValue }
  } else {
    searchObj = { codeNumber: data?.submitValues?.qrCodeValue }
  }

  const resultQRCodeVerification = await getQRCode(searchObj);
  const resultOrderNumberVerification = await getOrder(data?.submitValues?.orderNumber);

  if (!resultQRCodeVerification || resultQRCodeVerification.error || (!resultQRCodeVerification?.QRCode && !resultQRCodeVerification?.codeNumber)) {
    return res.status(404).json({ error: 'QRCode não encontrado na base de dados. Por favor, gerar um novo QRCode ou tente novamente.' });
  }

  if (resultOrderNumberVerification?.orderNumber) {
    return res.status(406).json({ error: 'Parece que esse número de pedido já está registrado no banco, por favor, inserir um valor válido.' });
  }

  const url = `${process.env.URL}/order/${data?.submitValues?.orderNumber}`;
  const qrcode = await QRCode.toDataURL(url).then(data => data);

  delete data.submitValues.qrCodeValue;

  const newObj = {
    ...data.submitValues,
    originalURL: resultQRCodeVerification.originalURL,
    originalQRCode: resultQRCodeVerification.QRCode,
    originalURL: resultQRCodeVerification.originalURL,
    originalCodeNumber: resultQRCodeVerification.codeNumber,
    QRCode: qrcode,
    url,
    createdAt: new Date().toLocaleString()
  };

  const resultOnRegisterOrder = await saveOrder(newObj);

  if (!resultOnRegisterOrder || resultOnRegisterOrder.error || !qrcode.includes("data:image")) {
    return res.status(400).json({ error: 'Ocorreu um problema ao registrar o novo pedido.' });
  }

  return res.status(200).json({ sucess: "Seu pedido foi registrado com sucesso!", QRCode: qrcode, newOrderNumber: data?.submitValues?.orderNumber });
}
