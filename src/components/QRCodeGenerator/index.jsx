import Link from 'next/link';
import styles from './styles.module.css';
import QRCode from 'qrcode';
import Loader from '../Loader';
import moment from "moment-timezone";
import { useState } from 'react';
import html2canvas from 'html2canvas';
import QRCodeVetor from 'qrcode-svg';
import svgToDataURL from 'svg-to-dataurl';

export default function QRCodeGenerator() {
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [srcQRCode, setSrcQRCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resultClass = [styles.container];

  async function download() {
    setIsLoading(true);

    const content = document.getElementById("qrcodeimg");

    if (!content) {
      setImageNotExist(true);
      return;
    }

    html2canvas(content).then(canvas => {
      const link = document.createElement('a')
      link.download = `${randomOrderNumber}.png`
      link.href = canvas.toDataURL();
      link.click();
    });

    setIsLoading(false);
  }


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
      const currentDate = moment().tz("America/Sao_Paulo").format('DD/MM/YYYY HH:mm:ss');

      const svgImage = new QRCodeVetor(url).svg();
      const dataUrl = svgToDataURL(svgImage);

      const registerResult = await fetch(`/api/insert-qrcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codeNumber: codeNumber,
          originalQRCode: dataUrl,
          originalURL: url,
          createdAt: currentDate
        })
      })
        .then(res => res.json());

      setSrcQRCode(dataUrl);
      setRandomOrderNumber(codeNumber);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  if (isLoading) return <Loader />
  if (randomOrderNumber) resultClass.push(styles.contentResult);

  return (
    <div className={resultClass.join(' ')}>
      <h1 className={styles.title}>Clique no botão abaixo para gerar um QRCode aleatório com um novo número de pedido</h1>
      <button onClick={getRandomNumber} className={styles.button}>Gerar QRCode {randomOrderNumber && 'novamente'}</button>


      {
        randomOrderNumber &&
        <>
          <p className={styles.description} style={{ marginTop: '1em', marginBottom: '0' }}>Número do QRCode gerado: <span>{randomOrderNumber}</span></p>

          <div className="qrcodeContent" id="qrcodeimg">
            <img src={srcQRCode} alt="QRCode" className={styles.image} />
            <p className={styles.description}><span>{randomOrderNumber}</span></p>
          </div>

          <div className={styles.buttonContent}>
            <Link href={`${process.env.URL}/order/${randomOrderNumber}`}>
              <a title="url" target="_blank">
                <button className={`${styles.button} ${styles.buttonLast}`}>
                  Acessar detalhes do pedido
                </button>
              </a>
            </Link>

            <a title="qrcodedownload" id="donwloadButton" href={srcQRCode} download>
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
