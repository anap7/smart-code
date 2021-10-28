import dynamic from 'next/dynamic'
import { useState } from 'react';
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

export default function QRCodeGenerator({ result, setResult }) {
  const [isReading, setIsReading] = useState(false);

  const previewStyle = {
    height: 240,
    width: 320,
  }

  function handleScan(data){
    console.log("Leitura");
    console.log(data);

    if (data) {
      alert("ACHOU");
      setResult(data);
      setIsReading(false);
    } 
  }

  function change() {
    setIsReading(!isReading);
  }

  function handleError(err){
    console.log("Ocorreu um erro");
    console.error(err);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <button onClick={change}>Clique aqui pra {isReading ? "encerrar o scaneamento" : "scanear"}</button>
      <p style={{marginTop: '5em'}}>AQUI: {result}</p>
      {
        isReading &&
        <QrReader

          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />
      }
      
       
    </div>
  )
}
