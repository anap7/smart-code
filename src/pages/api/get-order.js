import { getOrderData } from '../../services/database';

export default async function handler(req, res) {

  const data = req.body;

  let searchObjCodeNumber = {};
  let searchObjOrderNumber = {};
  let searchObjUrl = {};
  let searchObjOriginalUrl = {};

  if (data.type === "url") {
    searchObjUrl = { url: data?.inputValue };
    searchObjOriginalUrl = { originalURL: data?.inputValue }
  } else {
    searchObjCodeNumber = { codeNumber: data?.inputValue };
    searchObjOrderNumber = { orderNumber: data?.inputValue };
  }

  const resultByURLVerification = await getOrderData(searchObjUrl);
  const resultByURLOriginalVerification = await getOrderData(searchObjOriginalUrl);
  const resultByCodeNumberVerification = await getOrderData(searchObjCodeNumber);
  const resultByOrderNumberVerification = await getOrderData(searchObjOrderNumber);

  ("RESULTADO NA API PARA A VERIFICAÇÃO");
  console.log("URL");
  console.log(resultByURLVerification?.codeNumber);
  console.log("\n");
  console.log("URL Original");
  console.log(resultByURLOriginalVerification?.codeNumber);
  console.log("\n");
  console.log("CodeNumber");
  console.log(resultByCodeNumberVerification?.codeNumber);
  console.log("\n");
  console.log("OrderNumber");
  console.log(resultByOrderNumberVerification?.codeNumber);

  if (!resultByURLVerification?._id && !resultByCodeNumberVerification?._id && !resultByOrderNumberVerification?._id && !resultByURLOriginalVerification._id) {
    return res.status(404).json({ error: 'O pedido não foi encontrado na nossa base de dados, por favor, conferir valores' });
  }

  let searchResult = {};

  if (resultByURLVerification?._id) {
    searchResult = {
      codeNumber: resultByURLVerification?.codeNumber,
      orderNumber: resultByURLVerification?.orderNumber,
      url: resultByURLVerification?.url,
    };
  } else if (resultByURLOriginalVerification?._id) {
    searchResult = {
      codeNumber: resultByURLOriginalVerification?.codeNumber,
      orderNumber: resultByURLOriginalVerification?.orderNumber,
      url: resultByURLOriginalVerification?.url,
    };
  } else if (resultByCodeNumberVerification?._id) {
    searchResult = {
      codeNumber: resultByCodeNumberVerification?.codeNumber,
      orderNumber: resultByCodeNumberVerification?.orderNumber,
      url: resultByCodeNumberVerification?.url,
    };

  } else if (resultByOrderNumberVerification?._id) {
    searchResult = {
      codeNumber: resultByOrderNumberVerification?.codeNumber,
      orderNumber: resultByOrderNumberVerification?.orderNumber,
      url: resultByOrderNumberVerification?.url,
    };
  }


  return res.status(200).json({ sucess: "Pedido encontrado", searchResult });
}
