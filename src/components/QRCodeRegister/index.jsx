import styles from './styles.module.css';
import Loader from '../Loader';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useState } from 'react';
import { FaCamera } from "react-icons/fa";
import { register } from '../../services/helpers';
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

export default function QRCodeRegister() {
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

  const previewStyle = {
    height: 240,
    width: 320,
    marginBottom: '6em'
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const obj = {
      qrCodeValue,
      orderNumber
    }

    await register(obj, setStatus, setSrc, setRandomOrderNumber, setCodeNumber);
    setIsLoading(false);
    
    return false;
  }

  function handleScan(data) {
    if (data) {
      setIsReading(false);
      setQrCodeValue(data);
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.mainContent}>
        <div className={styles.formContent}>
          <h1 className={styles.mainTitle}>Associar Pedido</h1>
          {
            !isReading &&
            <>
              <label className={styles.label}>Insira o número do QRCode ou da URL gerada ou faça a leitura do QRCode</label>
              <input 
                className={styles.input} 
                onChange={(e) => setQrCodeValue(e.target.value)}
                type="text" 
                placeholder="Número do QRCode ou URL" id="QRNumber" 
                value={qrCodeValue ? qrCodeValue : undefined }
                required 
              />
            </>
          }

          {
            isReading &&
            <QrReader
              style={previewStyle}
              onError={(error) => {
                console.log(error);
                setIsReading(false);
              }}
              onScan={handleScan}
            />
          }

          <button onClick={() => setIsReading(!isReading)} className={`${styles.button} ${styles.qrcodeReaderButton}`}>
            <FaCamera size={'1.5em'} />
            <span>Clique aqui pra {isReading ? "encerrar a leitura" : "ler o QRCode"}</span>
          </button>

          {
            !isReading &&
            <>
              <label className={styles.label} style={{ marginTop: '2em' }}>Insira o novo número do pedido</label>
              <input 
                className={styles.input} type="text" 
                placeholder="Número novo do pedido" id="newOrderNumber"
                onChange={(e) => setOrderNumber(e.target.value)}
                required 
              />

              <button className={styles.button} onClick={handleSubmit}>Registrar novo pedido</button>
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
          <h1 className={styles.title} >Pedido associado no QRCode</h1>

          <img src={src} alt="QRCode" className={styles.image} />

          <p className={styles.description}>Novo número de pedido associado: <span>{randomOrderNumber}</span></p>

          <div className={styles.buttonContent}>
            <Link href={`${process.env.URL}/order/${codeNumber}`}>
              <a title="url" target="_blank">
                <button className={`${styles.button} ${styles.buttonLast}`}>
                  Acessar detalhes do pedido
                </button>
              </a>
            </Link>

            <a title="qrcodedownload" href={src} download>
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
