import styles from './styles.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContent}>
        <Link href="/generator">
          <a title="gerar-qrcode">
            <button className={`${styles.button} ${styles.generatorButton}`}>
              Gerar QRCode
            </button>
          </a>
        </Link>

        <Link href="/search">
          <a title="buscar-qrcode">
            <button className={`${styles.button} ${styles.generatorButton}`}>
              Buscar QRCode
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
