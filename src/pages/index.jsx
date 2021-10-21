import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContent}>
        <h1>{`${process.env.URL}`}</h1>
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
              Associar QRCode a um pedido
            </button>
          </a>
        </Link>

        <Link href="/update">
          <a title="alterar-qrcode">
            <button className={styles.button}>
              Alterar o código do QRCode
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}
