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
              <span className={styles.items}>Gerar novo QRCode</span>
            </a>
          </Link>
          <Link href="/search">
            <a title="buscarQRCode">
              <span className={styles.items}>Buscar QRCode</span>
            </a>
          </Link>
          <Link href="/register">
            <a title="AssociarPedido">
              <span className={styles.items}>Associar Pedido</span>
            </a>
          </Link>
          <Link href="/update">
            <a title="AlterarPedido">
              <span className={styles.items}>Alterar Pedido</span>
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
