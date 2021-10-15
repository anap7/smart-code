import styles from './styles.module.css';
import Link from 'next/link';

export default function Menu({ children }) {
  return (
    <>
      <header className={styles.containerMenu}>
        <Link href="/">
          <a title="Voltar">
            <h1 className={styles.title}>SmartCode</h1>
          </a>
        </Link>
        <div className={styles.contentItems}>
          <Link href="/generator">
            <a title="GerarQRCode">
              <span className={styles.items}>Gerar Novo QRCode</span>
            </a>
          </Link>
          <Link href="/register">
            <a title="AssociarQRCode">
              <span className={styles.items}>Registrar QRCode</span>
            </a>
          </Link>
          <Link href="/update">
            <a title="AlterarQRCode">
              <span className={styles.items}>Alterar QRCode</span>
            </a>
          </Link>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  )
}
