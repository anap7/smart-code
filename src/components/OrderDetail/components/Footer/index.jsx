import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContent}>
      <div className={styles.footerWarning}>
        <img src="/logo.png" alt="aqui" width={80} className={styles.image}/>
        <p className={styles.footerTitle}>&copy; Copyright 2021 - Todos os direitos</p>
        <p className={styles.footerSubTitle}>Termos de uso | Política de Privacidade</p>
      </div>
    </footer>
  )
}
