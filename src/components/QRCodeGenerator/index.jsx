import Link from 'next/link';
import styles from './styles.module.css';
import Loader from '../Loader';
import moment from "moment-timezone";
import { useState } from 'react';
import svgToDataURL from 'svg-to-dataurl';

export default function QRCodeGenerator() {
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [srcQRCode, setSrcQRCode] = useState('');
  const [srcPDF, setSrcPDF] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resultClass = [styles.container];

  function downloadSVG() {
    const link2 = document.createElement('a');
    link2.download = `${randomOrderNumber}.svg`;
    link2.href = srcQRCode;
    link2.click();
  }

 function downloadPDF() {
    const link = document.createElement('a');
    link.download = `${randomOrderNumber}.pdf`;
    link.href = srcPDF;
    link.click();
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

      const files = await fetch(`https://pdf-nice-generator.herokuapp.com/generate-pdf?codeNumber=${codeNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => res.json())
        .catch(err => console.error(err));

      if(!files.svg || !files.pdf) {
        setIsLoading(false);
        alert("Ocorreu um problema durante a geração do QRCode, por favor, tente novamente");
        return
      }
  
      const svgImage = files.svg;
      const pdf = files.pdf;
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
          createdAt: currentDate,
          pdfFile: pdf,
          svgFile: svgImage
        })
      })
        .then(res => res.json());

      setSrcQRCode(dataUrl);
      setSrcPDF(pdf);
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
            <p className={styles.descriptionNumber}><span>{randomOrderNumber}</span></p>
          </div>

          <div className={styles.buttonContent}>
            <Link href={`${process.env.URL}/order/${randomOrderNumber}`}>
              <a title="url" target="_blank">
                <button className={`${styles.button} ${styles.buttonLast}`}>
                  Acessar detalhes do pedido
                </button>
              </a>
            </Link>

            <a title="qrcodedownload" id="donwloadButton" onClick={downloadPDF}>
              <button className={`${styles.button} ${styles.buttonLast}`}>
                Download do PDF
              </button>
            </a>

            <a onClick={() => window.print()}>
              <button className={`${styles.button} ${styles.buttonLast}`}>
                Gerar PDF
              </button>
            </a>
          </div>
        </>
      }
    </div>
  )
}
