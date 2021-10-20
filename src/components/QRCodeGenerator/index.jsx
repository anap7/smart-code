import Link from 'next/link';
import styles from './styles.module.css';
import QRCode from 'qrcode';
import Loader from '../Loader';
import { useState } from 'react';


export default function QRCodeGenerator() {
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [src, setSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function getRandomNumber() {
    const orderNumber = (Math.floor(100000000 + Math.random() * 900000000)) * 2;
    const url = `${process.env.URL}/order/${orderNumber}`;

    QRCode.toDataURL(url).then(async (data) => {
      setIsLoading(true);

      const result = await fetch(`/api/insert-qrcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          QRCode: data,
          codeNumber: orderNumber.toString(),
          originalURL: url,
          createdAt: new Date().toLocaleString()
        })
      })
        .then(res => res.json());

      setSrc(data);
      setIsLoading(false);
    });

    setRandomOrderNumber(orderNumber);
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clique no botão abaixo para gerar um QRCode aleatório com um novo número de pedido</h1>
      <button onClick={getRandomNumber} className={styles.button}>Gerar QRCode {randomOrderNumber && 'novamente'}</button>

      {
        randomOrderNumber &&
        <>
          <img src={src} alt="QRCode" width={250} height={250} />

          <p className={styles.description}>Número do QRCode gerado: <span>{randomOrderNumber}</span></p>

          <div className={styles.buttonContent}>
            <Link href={`${process.env.URL}/order/${randomOrderNumber}`}>
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

        </>
      }
    </div>
  )
}
