import styles from './styles.module.css';
import { FaDownload } from "react-icons/fa";

export default function DownloadContent() {
  return (
    <section className={styles.downloadContent}>
      <span className={styles.title}>Relatório completo: </span>
      <button className={styles.downloadButton} style={{ marginRight: '1em' }}>
        <FaDownload />
        <span>XLS</span>
      </button>
      <button className={styles.downloadButton}>
        <FaDownload />
        <span>PDF</span>
      </button>
    </section>
  )
}
