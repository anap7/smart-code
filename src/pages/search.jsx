import styles from '../styles/search.module.css';
import Loader from '../components/Loader';
import dynamic from 'next/dynamic'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaCamera } from "react-icons/fa";
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  const previewStyle = {
    height: 240,
    width: 320,
    marginBottom: '6em'
  }

  function searchOrder() {
    setIsLoading(true);

    if(qrCodeValue.includes('http', 'https')) {
      const splits = qrCodeValue.split('/order/');
      router.push(`/order/${splits[1]}`);
    } else {
      router.push(`/order/${qrCodeValue}`);
    }
  }

  function handleScan(data) {
    if (data) {
      setIsReading(false);
      setQrCodeValue(data);
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.container}>
      {
        !isReading &&
        <>
          <h1 className={styles.mainTitle}>Insira o número do QRCode</h1>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setQrCodeValue(e.target.value)}
            placeholder="Número do QRCode"
            id="QRNumber"
            name="codeNumber"
            value={qrCodeValue ? qrCodeValue : undefined}
            required
          />
          <button className={styles.button} onClick={searchOrder}>Buscar Pedido</button>
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
    </div>
  )
}
