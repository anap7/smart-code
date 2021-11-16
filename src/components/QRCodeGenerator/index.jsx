import Link from 'next/link';
import styles from './styles.module.css';
import QRCode from 'qrcode';
import Loader from '../Loader';
import { useState } from 'react';
import { createCompletedDate } from '../../services/helpers';

export default function QRCodeGenerator() {
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [src, setSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resultClass = [ styles.container ];

  async function getRandomNumber() {

    setIsLoading(true);

    const verificationResult = await fetch(`/api/generate-qrcode-number`, {
      method: 'GET',
      mode: 'no-cors'
    })
      .then(res => res.json());

    if (verificationResult?.codeNumber) {
      const codeNumber = verificationResult?.codeNumber;
      const url = `${process.env.URL}/order/${codeNumber}`;

      QRCode.toDataURL(url, { width: 400 }).then(async (data) => {
        const registerResult = await fetch(`/api/insert-qrcode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codeNumber: codeNumber,
            originalQRCode: data,
            originalURL: url,
            createdAt: createCompletedDate()
          })
        })
          .then(res => res.json());
        setSrc(data);
      });

      setRandomOrderNumber(codeNumber);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  if (isLoading) return <Loader />
  if (randomOrderNumber) resultClass.push(styles.contentResult);

  return (
    <div className={ resultClass.join(' ')}>
      <h1 className={styles.title}>Clique no botão abaixo para gerar um QRCode aleatório com um novo número de pedido</h1>
      <button onClick={getRandomNumber} className={styles.button}>Gerar QRCode {randomOrderNumber && 'novamente'}</button>

      {
        randomOrderNumber &&
        <>
          <img src={src} alt="QRCode" className={styles.image} />

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
