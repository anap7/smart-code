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
      orderNumber: resultByCodeNumberVerification?.orderNumber ? resultByCodeNumberVerification?.orderNumber : null,
      codeNumber: resultByCodeNumberVerification?.codeNumber ? resultByCodeNumberVerification?.codeNumber : null,
      url: resultByCodeNumberVerification?.originalURL ? resultByCodeNumberVerification?.originalURL : null,
      qrcode: resultByCodeNumberVerification?.originalQRCode ? resultByCodeNumberVerification?.originalQRCode : null,
    };

  } else if (resultByOrderNumberVerification?._id) {
    searchResult = {
      codeNumber: resultByOrderNumberVerification?.codeNumber,
      orderNumber: resultByOrderNumberVerification?.orderNumber,
      url: resultByOrderNumberVerification?.originalURL,
    };
  }

  if (data?.typeSearch === 'detail') {
    if(resultByCodeNumberVerification?._id) {
      return res.status(200).json({ sucess: "Pedido encontrado", searchResult });
    } else {
      return res.status(200).json({ sucess: "Pedido encontrado", searchResult });
    }
  } else {
    return res.status(200).json({ sucess: "Pedido encontrado", searchResult });
  }
  
}
