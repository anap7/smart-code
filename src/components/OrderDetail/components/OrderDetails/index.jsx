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
        <p className={styles.ordersDetailsItem}>Pedido: <span>693243603</span></p>
        <p className={styles.ordersDetailsItem}>Referência do cliente: <span>1501285 / V03 - Cx de Cartelas - Unid Tozin</span></p>
        <p className={styles.ordersDetailsItem}>Pedido do cliente: <span>4500222820</span></p>
        <p className={styles.ordersDetailsItem}>Item: <span>20</span></p>
        <p className={styles.ordersDetailsItem}>Status: <span>Entregue</span></p>
        <p className={styles.ordersDetailsItem}>Qtde.: <span>10.000</span></p>
        <p className={styles.ordersDetailsItem}>Saldo: <span>10.000</span></p>
        <p className={styles.ordersDetailsItem}>Qtd. Pallet Pedido: <span>8</span></p>
        <p className={styles.ordersDetailsItem}>Valor: <span>9.063,80</span></p>
      </div>
    </section>
  )
}
