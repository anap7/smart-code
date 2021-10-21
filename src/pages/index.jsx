import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
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
      </div>
    </div>
  )
}
