import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="aqui" width={85} />
        <span className={styles.clientName}>| Empresa random</span>
      </div>

      <div className={styles.companyContent}>
        <p className={styles.companyTitle}>Empresa random</p>
        <p className={styles.companyDescription}>CNPJ: 00.000.000/0000-00</p>
      </div>
    </header>
  )
}
