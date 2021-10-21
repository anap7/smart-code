import { getOrder, getOrderDataByURL, getOrderDataByCodeNumber, getOrderDataByOrderNumber, updateOrder } from '../../services/database';
import QRCode from 'qrcode';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

  const data = req.body;

  console.log(data);

  const completedDate = data?.submitValues?.completedDate;
  let searchObjCodeNumber = {};
  let searchObjOrderNumber = {};
  let searchObjUrl = {};
  let id = "";
  
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

  } else if (resultByCodeNumberVerification?._id) {
    id = resultByCodeNumberVerification?._id.toString()

  } else if (resultByOrderNumberVerification?._id) {
    id = resultByOrderNumberVerification?._id.toString()
  }

  console.log("\n ID GERADO");
  console.log(id);

  const url = `${process.env.URL}/order/${data?.submitValues?.orderNumber}`;
  const qrcode = await QRCode.toDataURL(url).then(data => data);

  const newObj = {
    orderNumber: data?.submitValues?.orderNumber,
    QRCode: qrcode,
    url,
    updateddAt: new Date().toLocaleString()
  };

  const updateResult = await updateOrder(newObj, id);

  if (!updateResult?.lastErrorObject?.n) {
    return res.status(404).json({ error: 'Ocorreu um problema ao registrar o  pedido, tente novamente!' });
  }

  if(updateResult?.lastErrorObject?.n > 0) {
    return res.status(200).json({ sucess: 'Pedido atualizado com sucesso!', QRCode: qrcode, newOrderNumber: data?.submitValues?.orderNumber });
  }
}
