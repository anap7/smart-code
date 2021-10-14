import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/generator">
        <a title="gerar-novo-qrcode">
          <button className={styles.button}>
            Gerar novo QRCode
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
  )
}
