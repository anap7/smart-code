import Head from 'next/head'

function Page({ qrcode }) {
  return (
    <div>
      <Head>
        <h1>Olá na página qrcode: {qrcode}</h1>
      </Head>
    </div>
  )
}

export async function getServerSideProps(context) {
  const qrCodeNumber = context.params.qrcode;

  return {
    props: {
      qrcode: qrCodeNumber
    }
  }
}

export default Page;