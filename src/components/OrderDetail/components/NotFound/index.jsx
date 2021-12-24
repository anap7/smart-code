import styles from './styles.module.css';

export default function NotFound({ codeNumber }) {
  return (
    <>
      <h1 className={styles.title}>Pedido não encontrado</h1>
      <div>

      </div>
      <section className={styles.orderContent}>
        <div className={styles.warningContent}>
          <p className={styles.warning}>As informações do <span className={styles.mark}>{codeNumber}</span> não foram encontradas, tente associar um pedido com
          esse número ou faça a geração de um novo QRCode</p>
        </div>
      </section>
    </>
  )
}
