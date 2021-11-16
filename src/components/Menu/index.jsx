import styles from './styles.module.css';
import Link from 'next/link';

export default function Menu({ children }) {
  const mainClasses = [styles.main, styles.center];
  //if (center) mainClasses.push(styles.center);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navigation}>
          <div>
            <Link href="/">
              <a title="Página inicial">
                <h1 className={styles.title}>Smart Code</h1>
              </a>
            </Link>
          </div>
          <div className={styles.contentMenu}>
            <Link href="/generator">
              <a title="GerarQRCode">
                <span className={styles.menu}>Gerar QRCode</span>
              </a>
            </Link>
            <Link href="/search">
              <a title="buscarQRCode">
                <span className={styles.menu}>Buscar QRCode</span>
              </a>
            </Link>
            <Link href="/register">
              <a title="AssociarPedido">
                <span className={styles.menu}>Associar Pedido</span>
              </a>
            </Link>
            <Link href="/update">
              <a title="AlterarPedido">
                <span className={styles.menu}>Alterar Pedido</span>
              </a>
            </Link>
          </div>
        </div>
      </header>
      <main className={ mainClasses.join(' ')}>
        {children}
      </main>
    </div>
  )
}
