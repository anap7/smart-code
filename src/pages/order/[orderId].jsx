import OrderDetail from "../../components/OrderDetail";

function Page({ codeNumber, orderNumber, qrcode }) {
  return (
    <OrderDetail codeNumber={codeNumber} orderNumber={orderNumber} qrcode={qrcode}/>
  )
}

export async function getServerSideProps(context) {
  const codeNumber = context.params.orderId;

  const result = await fetch(`${process.env.URL}/api/get-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputValue: codeNumber, typeSearch: 'detail' })
  })
    .then(res => res.json());

  return {
    props: {
      codeNumber,
      orderNumber: result?.searchResult ? result?.searchResult?.orderNumber : null,
      qrcode: result?.searchResult ? result?.searchResult?.qrcode : null
    }
  }
}

export default Page;