import { getOrder, getOrderDataByURL, getOrderDataByCodeNumber, getOrderDataByOrderNumber, updateOrder } from '../../services/database';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

  const data = req.body;

  console.log(data);

  const completedDate = data?.submitValues?.completedDate;
  let searchObjCodeNumber = {};
  let searchObjOrderNumber = {};
  let searchObjUrl = {};
  let id = "";
  let originalQRCode = "";
  
  if (data.type === "url") {
    searchObjUrl = { url: data?.submitValues?.inputValue };
  } else {
    searchObjCodeNumber = { originalCodeNumber: data?.submitValues?.inputValue }; 
    searchObjOrderNumber = { orderNumber: data?.submitValues?.inputValue };
  }

  const resultOrderNumberVerification = await getOrder(data?.submitValues?.orderNumber);

  const resultByURLVerification = await getOrderDataByURL(searchObjUrl, completedDate);
  const resultByCodeNumberVerification = await getOrderDataByCodeNumber(searchObjCodeNumber, completedDate);
  const resultByOrderNumberVerification = await getOrderDataByOrderNumber(searchObjOrderNumber, completedDate);

  console.log("\n");
  console.log("RESULTADO NA API");
  console.log("\n");
  console.log("URL");
  console.log(resultByURLVerification?._id);
  console.log("\n");
  console.log("CodeNumber");
  console.log(resultByCodeNumberVerification?._id);
  console.log("\n");
  console.log("OrderNumber");
  console.log(resultByOrderNumberVerification?._id);

  if (resultOrderNumberVerification?.orderNumber) {
    return res.status(404).json({ error: 'Parece que esse número de pedido já está registrado no banco, por favor, inserir um valor novo valor.' });
  }

  if (!resultByURLVerification?._id && !resultByCodeNumberVerification?._id && !resultByOrderNumberVerification?._id) {
    return res.status(404).json({ error: 'O pedido não foi encontrado na nossa base de dados, por favor, conferir valores' });
  }

  if (resultByURLVerification?._id) {
    id = resultByURLVerification?._id.toString();
    originalQRCode = resultByURLVerification?.originalQRCode;
    console.log("resultado url");
    console.log(resultByURLVerification);

  } else if (resultByCodeNumberVerification?._id) {
    id = resultByCodeNumberVerification?._id.toString();
    originalQRCode = resultByCodeNumberVerification?.originalQRCode;
    console.log("resultado code number");
    console.log(resultByCodeNumberVerification);

  } else if (resultByOrderNumberVerification?._id) {
    id = resultByOrderNumberVerification?._id.toString();
    originalQRCode = resultByOrderNumberVerification?.originalQRCode;
    console.log("resultado order number");
    console.log(resultByOrderNumberVerification);
  }

  console.log("\n ID GERADO");
  console.log(id);
  console.log("\n QRCode Gerado");
  console.log(originalQRCode);

  const url = `${process.env.URL}/order/${data?.submitValues?.orderNumber}`;

  const newObj = {
    orderNumber: data?.submitValues?.orderNumber,
    url,
    updateddAt: new Date().toLocaleString()
  };

  const updateResult = await updateOrder(newObj, id);

  if (!updateResult?.lastErrorObject?.n) {
    return res.status(404).json({ error: 'Ocorreu um problema ao registrar o  pedido, tente novamente!' });
  }

  if(updateResult?.lastErrorObject?.n > 0) {
    return res.status(200).json({ sucess: 'Pedido atualizado com sucesso!', originalQRCode: originalQRCode, newOrderNumber: data?.submitValues?.orderNumber });
  }
}
