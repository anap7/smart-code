import styles from './styles.module.css';

export default function orderContent() {
  return (
    <>
      <h1 className={styles.title}>Meus pedidos</h1>
        <section className={styles.orderContent}>
          <div>
            <div>
              <span className={styles.orderDescriptionTitle}>Número do pedido</span>
              <p className={styles.numberMark}>00000000000000000</p>
            </div>
          </div>
          <div>
            <span className={styles.orderDescriptionTitle}>Número do QRCode</span>
            <p className={styles.numberMark}>Q0000000000</p>
          </div>
          <button className={styles.button}>ENTREGUE</button>
        </section>
    </>
  )
}
