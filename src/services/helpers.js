import moment from "moment-timezone";

export function returnDateTime(date) {
  const currentDate = Date.parse(date);

  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;

  const dateFormated = `${day}/${month}/${currentDate.getFullYear()}`;
  const time = date.split("T")[1];

  return {
    date: dateFormated,
    time: time,
    completedDate: `${dateFormated}-${time}`,
  };
}

export function createCompletedDate() {
  const currentDate = moment().tz("America/Sao_Paulo").format();
  const date = moment(currentDate).format('DD/MM/YYYY HH:mm:ss');

  return date;
}

export function isNumeric(str) {
  let er = /^[0-9]+$/;
  return er.test(str);
}

export async function register(
  data,
  setStatus,
  setSrc,
  setRandomOrderNumber,
  setCodeNumber
) {
  const qrCodeValue = data.qrCodeValue;
  let type = "";

  if (qrCodeValue === "" || qrCodeValue === null) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: "O número do QRCode é um valor inválido.",
    }));

    return false;
  }

  if (qrCodeValue.includes("http", "https")) {
    type = "url";
  } else {
    type = "number";
    if (!qrCodeValue.includes("QR")) {
      setStatus((prevState) => ({
        ...prevState,
        isThereError: true,
        wasSucess: false,
        description: "O número do QRCode é um valor inválido.",
      }));

      setSrc("");
      setRandomOrderNumber(null);
      return false;
    }
  }

  if (!isNumeric(data.orderNumber)) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: "O número do pedido é um valor inválido.",
    }));

    setSrc("");
    setRandomOrderNumber(null);

    return false;
  }

  const result = await fetch(`/api/insert-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ submitValues: data, type }),
  }).then((res) => res.json());

  if (result.error || !result) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: result?.error
        ? result.error
        : "Ocorreu algum problema ao registrar o novo pedido.",
    }));

    setSrc("");
    setRandomOrderNumber(null);

    return false;
  }

  setStatus((prevState) => ({
    ...prevState,
    isThereError: false,
    wasSucess: true,
    description: "Seu pedido foi registrado com sucesso!",
  }));

  setSrc(result.originalQRCode);
  setRandomOrderNumber(result.newOrderNumber);
  setCodeNumber(result.codeNumber);

  return true;
}

export async function update(
  data,
  setStatus,
  setSrc,
  setRandomOrderNumber,
  setCodeNumber
) {
  const inputValue = data.inputValue;

  let type = "";

  inputValue.includes("http", "https") ? (type = "url") : (type = "number");

  if (!isNumeric(data.orderNumber)) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: "O número do pedido é um valor inválido.",
    }));

    setSrc("");
    setRandomOrderNumber(null);

    return false;
  }

  const result = await fetch(`/api/update-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ submitValues: data, type }),
  }).then((res) => res.json());

  if (result.error || !result) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: result?.error
        ? result.error
        : "Ocorreu algum problema ao registrar o novo pedido.",
    }));

    setSrc("");
    setRandomOrderNumber(null);

    return false;
  }

  setStatus((prevState) => ({
    ...prevState,
    isThereError: false,
    wasSucess: true,
    description: "Seu pedido foi registrado com sucesso!",
  }));

  setSrc(result.originalQRCode);
  setRandomOrderNumber(result.newOrderNumber);
  setCodeNumber(result.codeNumber);

  return true;
}

export async function findOrder(inputValue, setStatus, setFoundNumber) {
  let type = "";

  inputValue.includes("http", "https") ? (type = "url") : (type = "number");

  if (inputValue === "" || inputValue === null) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: "O número de verificação é um valor inválido.",
    }));

    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {},
    }));
    return false;
  }

  const result = await fetch(`/api/get-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputValue, type, typeSearch: "verification" }),
  }).then((res) => res.json());

  if (result.error || !result || !result?.searchResult) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description: result?.error
        ? result.error
        : "Ocorreu durante a busca do pedido.",
    }));

    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {},
    }));

    return false;
  }

  if (!result?.searchResult.orderNumber || !result?.searchResult.url) {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: true,
      wasSucess: false,
      description:
        "Parece que esse QRCode não tem um pedido associado ainda, por favor acesse a página de associar pedido para fazer o processo de atualização.",
    }));

    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {},
    }));

    return false;
  } else {
    setStatus((prevState) => ({
      ...prevState,
      isThereError: false,
      wasSucess: false,
      description: "",
    }));

    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: true,
      content: {
        ...result?.searchResult,
      },
    }));
  }

  return true;
}
