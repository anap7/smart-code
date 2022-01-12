import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContent}>
      <div className={styles.footerWarning}>
        <img src="/logo.jpg" alt="aqui" width={80} className={styles.image}/>
        <p className={styles.footerTitle}>&copy; Copyright 2021 - Todos os direitos reservados à Klabin</p>
        <p className={styles.footerSubTitle}>Termos de uso | Política de Privacidade</p>
      </div>
    </footer>
  )
}
