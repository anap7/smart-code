import { getOrderData } from '../../services/database';

export default async function handler(req, res) {

  const data = req.body;

  let searchObjCodeNumber = {};
  let searchObjOrderNumber = {};
  let searchObjOriginalUrl = {};

  if (data.type === "url") {
    searchObjOriginalUrl = { originalURL: data?.inputValue }
  } else {
    searchObjCodeNumber = { codeNumber: data?.inputValue };
    searchObjOrderNumber = { orderNumber: data?.inputValue };
  }

  const resultByURLOriginalVerification = await getOrderData(searchObjOriginalUrl);
  const resultByCodeNumberVerification = await getOrderData(searchObjCodeNumber);
  const resultByOrderNumberVerification = await getOrderData(searchObjOrderNumber);

  console.log("RESULTADO NA API PARA A VERIFICAÇÃO");
  console.log("URL Original");
  console.log(resultByURLOriginalVerification?.codeNumber);
  console.log("\n");
  console.log("CodeNumber");
  console.log(resultByCodeNumberVerification?.codeNumber);
  console.log("\n");
  console.log("OrderNumber");
  console.log(resultByOrderNumberVerification?.codeNumber);

  if (!resultByCodeNumberVerification?._id && !resultByOrderNumberVerification?._id && !resultByURLOriginalVerification._id) {
    return res.status(404).json({ error: 'O pedido não foi encontrado na nossa base de dados, por favor, conferir valores' });
  }

  let searchResult = {};

  if (resultByURLOriginalVerification?._id) {
    searchResult = {
      codeNumber: resultByURLOriginalVerification?.codeNumber,
      orderNumber: resultByURLOriginalVerification?.orderNumber,
      url: resultByURLOriginalVerification?.originalURL,
    };
  } else if (resultByCodeNumberVerification?._id) {
    searchResult = {
      codeNumber: resultByCodeNumberVerification?.codeNumber,
      orderNumber: resultByCodeNumberVerification?.orderNumber,
      url: resultByCodeNumberVerification?.originalURL,
    };

  } else if (resultByOrderNumberVerification?._id) {
    searchResult = {
      codeNumber: resultByOrderNumberVerification?.codeNumber,
      orderNumber: resultByOrderNumberVerification?.orderNumber,
      url: resultByOrderNumberVerification?.originalURL,
    };
  }

  return res.status(200).json({ sucess: "Pedido encontrado", searchResult });
}
