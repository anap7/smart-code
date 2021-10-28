import Link from 'next/link';
import styles from '../styles/home.module.css';
import QRCodeReader from '../components/QRCodeReader';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState('No result');

  return (
    <div className={styles.container}>
      <h1>{result}</h1>
      <div className={styles.buttonContent}>
        <Link href="/generator">
          <a title="gerar-novo-qrcode">
            <button className={`${styles.button} ${styles.generatorButton}`}>
              Gerar novo QRCode
            </button>
          </a>
        </Link>

        <Link href="/register">
          <a title="registrar-qrcode">
            <button className={styles.button}>
              Associar Pedido
            </button>
          </a>
        </Link>

        <Link href="/update">
          <a title="alterar-qrcode">
            <button className={styles.button}>
              Alterar Pedido
            </button>
          </a>
        </Link>

        <QRCodeReader result={result} setResult={setResult}/>
      </div>
    </div>
  )
}
