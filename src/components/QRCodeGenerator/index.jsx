import Link from 'next/link';
import styles from './styles.module.css';
import QRCode from 'qrcode';
import { useState } from 'react';


export default function QRCodeGenerator() {
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [src, setSrc] = useState('');

  function getRandomNumber() {
    setRandomOrderNumber(Math.floor(1000000 + Math.random() * 9000000));

    let url = `${process.env.URL}/order/${randomOrderNumber}`;

    QRCode.toDataURL(url).then((data) => {
      console.log(data);
      setSrc(data);
    });
  }

  return (
    <div className={styles.container}>
      <h1>Gere o seu número de pedido aleatório:</h1>
      <button onClick={getRandomNumber}>Gerar QRCode</button>

      {
        randomOrderNumber &&
        <>
          <img src={src} alt="QRCode" width={300} height={300} />
          <Link href={`${process.env.URL}/order/${randomOrderNumber}`}>
            <a title="url" target="_blank">
              <button>
                Clique aqui para acessar os detalhes do pedido gerado
              </button>
            </a>
          </Link>
        </>
      }

    </div>
  )
}
