import styles from './styles.module.css';
import { FaDownload } from "react-icons/fa";

export default function DownloadContent() {

  return (
    <section className={styles.downloadContent}>
      <div className={styles.nfContent}>
        <span className={styles.title}>Nota Fiscal: </span>
        <a title="nfDownload" href='/certifQA.pdf' download>
          <button className={`${styles.downloadButton} ${styles.nfButton}`}>
            <FaDownload />
            <span style={{ marginLeft: '.5em' }}>PDF</span>
          </button>
        </a>
      </div>
      <div className={styles.certicationContent}>
        <span className={styles.title}>Certificado de Qualidade: </span>
        <a title="certiDownload" href='/certifQA.pdf' download>
          <button className={styles.downloadButton}>
            <FaDownload />
            <span style={{ marginLeft: '.5em' }}>PDF</span>
          </button>
        </a>
      </div>
    </section>
  )
}
