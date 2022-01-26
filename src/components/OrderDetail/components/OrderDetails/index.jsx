import styles from './styles.module.css';

export default function OrderDetails() {
  return (
    <section className={styles.detailsStatusContent}>
      <div className={styles.detailsStatusHeader}>
        <p className={styles.statusTitle}><span style={{ fontSize: '.8em', fontWeight: 'bold', marginRight: '.5em' }}>+</span>Detalhes e status do pedido</p>
      </div>
      <div className={styles.ordersDetailsMainTitleContent}>
        <p className={styles.ordersDetailsMainTitle}>DADOS DO PEDIDO</p>
      </div>
      <div className={styles.ordersDetails}>
        <p className={styles.ordersDetailsItem}>Pedido: <span>Suspendisse lobortis velit lectus. Vivamus vulputate lobortis mauris vel rhoncus.</span></p>
        <p className={styles.ordersDetailsItem}>Referência do cliente: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Pedido do cliente: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Item: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Status: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Qtde.: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Saldo: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Qtd. Pallet Pedido: <span>Suspendisse lobortis velit lectus.</span></p>
        <p className={styles.ordersDetailsItem}>Valor: <span>Suspendisse lobortis velit lectus.</span></p>
      </div>
    </section>
  )
}
