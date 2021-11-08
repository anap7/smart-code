import { getOrder, getOrderData, updateOrder } from '../../services/database';

export default async function handler(req, res) {

  const data = req.body;

  let searchObjCodeNumber = {};
  let searchObjOrderNumber = {};
  let searchObjOriginalUrl = {};
  let id = "";
  let qrcode = "";

  if (data.type === "url") {
    searchObjOriginalUrl = { originalURL: data?.submitValues?.inputValue };
  } else {
    searchObjCodeNumber = { codeNumber: data?.submitValues?.inputValue };
    searchObjOrderNumber = { orderNumber: data?.submitValues?.inputValue };
  }

  const resultOrderNumberVerification = await getOrder(data?.submitValues?.orderNumber);

  const resultByURLOriginalVerification = await getOrderData(searchObjOriginalUrl);
  const resultByCodeNumberVerification = await getOrderData(searchObjCodeNumber);
  const resultByOrderNumberVerification = await getOrderData(searchObjOrderNumber);

  console.log("RESULTADO NA API PARA A ALTERAÇÃO");
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

  if (!resultByCodeNumberVerification?._id && !resultByOrderNumberVerification?._id && !resultByURLOriginalVerification._id) {
    return res.status(404).json({ error: 'O pedido não foi encontrado na nossa base de dados, por favor, conferir valores' });
  }

  if (resultByURLOriginalVerification?._id) {
    id = resultByURLOriginalVerification?._id.toString();
    qrcode = resultByURLOriginalVerification?.originalQRCode;

  } else if (resultByCodeNumberVerification?._id) {
    id = resultByCodeNumberVerification?._id.toString();
    qrcode = resultByCodeNumberVerification?.originalQRCode;

  } else if (resultByOrderNumberVerification?._id) {
    id = resultByOrderNumberVerification?._id.toString();
    qrcode = resultByOrderNumberVerification?.originalQRCode;
  }

  const newObj = {
    orderNumber: data?.submitValues?.orderNumber,
    updatedAt: new Date().toLocaleString('pt-br')
  };

  const updateResult = await updateOrder(newObj, id);

  if (!updateResult?.lastErrorObject?.n) {
    return res.status(404).json({ error: 'Ocorreu um problema ao registrar o  pedido, tente novamente!' });
  }

  if (updateResult?.lastErrorObject?.n > 0) {
    return res.status(200).json({ sucess: 'Pedido atualizado com sucesso!', originalQRCode: qrcode, newOrderNumber: data?.submitValues?.orderNumber });
  }
}
