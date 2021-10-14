import Head from 'next/head'

function Page({ orderId }) {
  return (
    <div>
        <h1>Olá esse é o pedido: {orderId}</h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  const orderId = context.params.orderId;

  return {
    props: {
      orderId: orderId
    }
  }
}

export default Page;