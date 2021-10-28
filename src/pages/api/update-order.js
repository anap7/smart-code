import { getOrder, getOrderData, updateOrder } from '../../services/database';
import QRCode from 'qrcode';

export default async function handler(req, res) {

  const data = req.body;

  let searchObjCodeNumber = {};
  let searchObjOrderNumber = {};
  let searchObjUrl = {};
  let searchObjOriginalUrl = {};
  let id = "";
  
  if (data.type === "url") {
    searchObjUrl = { url: data?.submitValues?.inputValue };
    searchObjOriginalUrl = { originalURL: data?.submitValues?.inputValue };
  } else {
    searchObjCodeNumber = { codeNumber: data?.submitValues?.inputValue }; 
    searchObjOrderNumber = { orderNumber: data?.submitValues?.inputValue };
  }

  const resultOrderNumberVerification = await getOrder(data?.submitValues?.orderNumber);

  const resultByURLVerification = await getOrderData(searchObjUrl);
  const resultByURLOriginalVerification = await getOrderData(searchObjOriginalUrl);
  const resultByCodeNumberVerification = await getOrderData(searchObjCodeNumber);
  const resultByOrderNumberVerification = await getOrderData(searchObjOrderNumber);

  ("RESULTADO NA API PARA A ALTERAÇÃO");
  console.log("URL");
  console.log(resultByURLVerification?.codeNumber);
  console.log("\n");
  console.log("URL ORIGINAL");
  console.log(resultByURLOriginalVerification?.codeNumber);
  console.log("\n");
  console.log("CodeNumber");
  console.log(resultByCodeNumberVerification?.codeNumber);
  console.log("\n");
  console.log("OrderNumber");
  console.log(resultByOrderNumberVerification?.codeNumber);

  if (resultOrderNumberVerification?.orderNumber) {
    return res.status(404).json({ error: 'Parece que esse número de pedido já está registrado no banco, por favor, inserir um valor novo valor.' });
  }

  if (!resultByURLVerification?._id && !resultByCodeNumberVerification?._id && !resultByOrderNumberVerification?._id && !resultByURLOriginalVerification._id) {
    return res.status(404).json({ error: 'O pedido não foi encontrado na nossa base de dados, por favor, conferir valores' });
  }

  if (resultByURLVerification?._id) {
    id = resultByURLVerification?._id.toString();

  } else if (resultByURLOriginalVerification?._id) {
    id = resultByURLOriginalVerification?._id.toString();

  } else if (resultByCodeNumberVerification?._id) {
    id = resultByCodeNumberVerification?._id.toString();

  } else if (resultByOrderNumberVerification?._id) {
    id = resultByOrderNumberVerification?._id.toString();
  }


  const url = `${process.env.URL}/order/${data?.submitValues?.orderNumber}`;
  const qrcode = await QRCode.toDataURL(url).then(data => data);

  const newObj = {
    orderNumber: data?.submitValues?.orderNumber,
    QRCode: qrcode,
    url,
    updatedAt: new Date().toLocaleString('pt-br')
  };

  const updateResult = await updateOrder(newObj, id);

  if (!updateResult?.lastErrorObject?.n) {
    return res.status(404).json({ error: 'Ocorreu um problema ao registrar o  pedido, tente novamente!' });
  }

  if(updateResult?.lastErrorObject?.n > 0) {
    return res.status(200).json({ sucess: 'Pedido atualizado com sucesso!', originalQRCode: qrcode, newOrderNumber: data?.submitValues?.orderNumber });
  }
}
