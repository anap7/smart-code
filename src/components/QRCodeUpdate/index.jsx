import styles from './styles.module.css';
import { useState } from 'react';
import Loader from '../Loader';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { update, findOrder } from '../../services/helpers';
import { FaCamera } from "react-icons/fa";
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

export default function QRCodeUpdate() {
  const [status, setStatus] = useState({
    isThereError: false,
    wasSucess: false,
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [src, setSrc] = useState('');
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [codeNumber, setCodeNumber] = useState(null);
  const [foundNumber, setFoundNumber] = useState({
    wasFound: false,
    content: {}
  });

  const previewStyle = {
    height: 240,
    width: 320,
    marginBottom: '6em'
  }

  async function downloadToPDF() {
    const files = await fetch(`http://pdf-nice-generator.herokuapp.com/generate-pdf?codeNumber=${codeNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    if (!files.svg || !files.pdf) {
      alert("Ocorreu um problema durante a geração do QRCode, por favor, tente novamente");
      return
    }

    const link = document.createElement('a');
    const pdf = files.pdf;
    link.download = `${codeNumber}.pdf`;
    link.href = pdf;
    link.click();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {}
    }));

    setIsLoading(true);

    const inputValue = foundNumber?.content?.codeNumber;

    const obj = {
      inputValue,
      orderNumber
    }

    await update(obj, setStatus, setSrc, setRandomOrderNumber, setCodeNumber);

    setIsLoading(false);

    return false;
  }

  async function handleClick(e) {
    e.preventDefault();

    setIsLoading(true);
    setSrc('');
    setRandomOrderNumber(null);

    const inputValue = document.getElementsByName("QRNumber")[0].value;

    await findOrder(inputValue, setStatus, setFoundNumber);

    setIsLoading(false);

    return false;
  }

  function searchAgain() {
    setSrc('');
    setRandomOrderNumber(null);
    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
      content: {}
    }));
  }

  function handleScan(data) {
    setFoundNumber((prevState) => ({
      ...prevState,
      wasFound: false,
    }));

    if (data) {
      setIsReading(false);
      setQrCodeValue(data);
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.mainContent}>
      <div className={styles.formContent}>
        <h1 className={styles.mainTitle}>Alterar Pedido</h1>
        {
          (!foundNumber.wasFound || isReading) &&
          <>
            <label className={styles.label}>Insira o número do pedido, número do QRCode ou URL gerada</label>
            <input
              className={styles.input}
              placeholder="QRCode, URL ou número do pedido"
              name="QRNumber"
              type="text"
              onChange={(e) => setQrCodeValue(e.target.value)}
              value={qrCodeValue ? qrCodeValue : undefined}
              required
            />
            <button className={`${styles.button} ${styles.searchButton}`} onClick={handleClick}>Buscar Pedido</button>
          </>
        }

        {
          isReading &&
          <QrReader
            style={previewStyle}
            onError={(error) => {
              alert("Ocorreu um problema durante a leitura QRCode");
              setIsReading(false);
            }}
            onScan={handleScan}
          />
        }

        {
          !foundNumber.wasFound &&
          <>
            <button onClick={() => setIsReading(!isReading)} className={`${styles.button} ${styles.qrcodeReaderButton}`}>
              <FaCamera size={'1.5em'} />
              <span>Clique aqui pra {isReading ? "encerrar a leitura" : "ler o QRCode"}</span>
            </button>
          </>
        }

        {
          foundNumber.wasFound &&
          <>
            <div className={styles.foundContent}>
              <h2 className={styles.subTitle}>Pedido encontrado!</h2>
              <p className={styles.subTitleItem}>Número original do QRCode: <span>{foundNumber?.content?.codeNumber}</span></p>
              <p className={styles.subTitleItem}>Número do pedido Atual: <span>{foundNumber?.content?.orderNumber}</span></p>
            </div>

            <label className={styles.label}>Insira o novo número do pedido</label>
            <input
              className={styles.input}
              placeholder="Número novo do pedido"
              name="newOrderNumber"
              type="text"
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />

            <p className={styles.buttonContent}>
              <button className={`${styles.button} ${styles.searchButton}`} onClick={handleSubmit}>Alterar Pedido</button>
              <button className={`${styles.button} ${styles.searchButton}`} onClick={searchAgain}>Buscar Novamente</button>
            </p>
          </>
        }

        {
          status.isThereError &&
          <p className={styles.warning}>{status.description}</p>
        }

        {
          status.wasSucess &&
          <p className={styles.sucess}>{status.description}</p>
        }
      </div>
      {
        randomOrderNumber &&
        <div className={styles.qrcodeResultContent}>
          <h2 className={styles.title}>Pedido substituido no QRCode</h2>

          <div className="qrcodeContent" id="qrcodeimg">
            <img src={src} alt="QRCode" className={styles.image} />
            <p className={styles.description}><span>{codeNumber}</span></p>
          </div>

          <p className={styles.description}>Novo número do pedido substituido: <span>{randomOrderNumber}</span></p>

          <div className={styles.buttonContent}>
            <Link href={`${process.env.URL}/order/${codeNumber}`}>
              <a title="url" target="_blank">
                <button className={`${styles.button} ${styles.buttonLast}`}>
                  Acessar detalhes do pedido
                </button>
              </a>
            </Link>

            <a title="qrcodedownload" onClick={downloadToPDF}>
              <button className={`${styles.button} ${styles.buttonLast}`}>
                Download do QRCode
              </button>
            </a>
          </div>
        </div>
      }
    </div>
  )
}
