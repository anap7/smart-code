import styles from './styles.module.css';
import { FaDownload } from "react-icons/fa";

export default function DownloadContent() {

  return (
    <section className={styles.downloadContent}>
      <span className={styles.title}>Nota Fiscal: </span>
      <a title="nfDownload" href='/certifQA.pdf' download>
        <button className={styles.downloadButton} style={{ marginRight: '1em' }}>
          <FaDownload />
          <span style={{marginLeft: '.5em'}}>PDF</span>
        </button>
      </a>
      <span className={styles.title}>Certificado de Qualidade: </span>
      
      <a title="certiDownload" href='/certifQA.pdf' download>
        <button className={styles.downloadButton}>
        <FaDownload />
        <span style={{marginLeft: '.5em'}}>PDF</span>
      </button>
      </a> 
    </section>
  )
}
