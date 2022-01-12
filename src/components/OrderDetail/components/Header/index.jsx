import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
        <img src="/logo.jpg" alt="aqui" width={85} />
        <span className={styles.clientName}>| Dori</span>
      </div>

      <div className={styles.companyContent}>
        <p className={styles.companyTitle}>Dori</p>
        <p className={styles.companyDescription}>CNPJ: 12.345.678/0001-00</p>
      </div>
    </header>
  )
}
