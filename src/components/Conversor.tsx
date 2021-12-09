import { useState, ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { valuesApi } from '../api/routes'
import { ToastContainer, toast } from 'react-toastify';

export default function Conversor() {
  const [selectedCoin, setSelectedCoin] = useState<string>()
  const [typedValue, setTypedValue] = useState<string>('')
  const [dollarValue, setDollarValue] = useState<string>('')
  const [euroValue, setEuroValue] = useState<string>('')
  const [realValue, setRealValue] = useState<string>('')

  const now = new Date()

  async function setValues(coin: string) {
    if (coin === 'BRL') {
      await valuesApi.get(`/${coin}-USD`).then((res) => {
        const realToDollar = Number(res.data.BRLUSD.high) * Number(typedValue)
        setDollarValue(String(realToDollar.toFixed(2)))
      })
      await valuesApi.get(`/${coin}-EUR`).then((res) => {
        const realToEuro = Number(res.data.BRLEUR.high) * Number(typedValue)
        setEuroValue(String(realToEuro.toFixed(2)))
      })
    }
    if (coin === 'USD') {
      await valuesApi.get(`/${coin}-EUR`).then((res) => {
        const dollarToEuro = Number(res.data.USDEUR.high) * Number(typedValue)
        setEuroValue(String(dollarToEuro.toFixed(2)))
      })
      await valuesApi.get(`/${coin}-BRL`).then((res) => {
        const dollarToReal = Number(res.data.USDBRL.high) * Number(typedValue)
        setRealValue(String(dollarToReal.toFixed(2)))
      })
    }

    if (coin === 'EUR') {
      await valuesApi.get(`/${coin}-USD`).then((res) => {
        const euroToDollar = Number(res.data.EURUSD.high) * Number(typedValue)
        setDollarValue(String(euroToDollar.toFixed(2)))
      })
      await valuesApi.get(`/${coin}-BRL`).then((res) => {
        const euroToReal = Number(res.data.EURBRL.high) * Number(typedValue)
        setRealValue(String(euroToReal.toFixed(2)))
      })
    }
  }

  function renderResult(coin: string) {
    //@ts-ignore
    document.querySelector('.data-container').style.display = 'block'
    //@ts-ignore
    document.querySelector('.footer').style.display = 'block'
    if (coin === 'EUR') {
      //@ts-ignore
      document.querySelector('.real').style.display = 'block'

      //@ts-ignore
      document.querySelector('.dollar').style.display = 'block'

      //@ts-ignore
      document.querySelector('.euro').style.display = 'none'
    }

    if (coin === 'USD') {
      //@ts-ignore
      document.querySelector('.real').style.display = 'block'

      //@ts-ignore
      document.querySelector('.dollar').style.display = 'none'

      //@ts-ignore
      document.querySelector('.euro').style.display = 'block'
    }

    if (coin === 'BRL') {
      //@ts-ignore
      document.querySelector('.real').style.display = 'none'

      //@ts-ignore
      document.querySelector('.dollar').style.display = 'block'

      //@ts-ignore
      document.querySelector('.euro').style.display = 'block'
    }
  }

  function getCoinValue(coin: string) {
    if (coin === 'undefined' || !typedValue) {
      toast.error('Ocorreu um erro, revise os dados!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      setValues(coin)
      renderResult(coin)
    }
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <div className='conversor-container'>
        <p>Informe o valor e a moeda para conversão</p>
        <hr />

        <Form.Group controlId='formBasicSelect' className='form-container'>
          <h5>Valor</h5>
          <Form.Control
            type='number'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTypedValue(e.target.value)}
          />
          <h5>Moeda</h5>
          <Form.Control
            as='select'
            onChange={(event) => {
              setSelectedCoin(event.target.value)
            }}
          >
            <option value='undefined'>Selecione:</option>
            <option value='USD'>Dólar</option>
            <option value='EUR'>Euro</option>
            <option value='BRL'>Real</option>
          </Form.Control>
        </Form.Group>

        <button onClick={() => getCoinValue(String(selectedCoin))}>Converter</button>

        <div className='data-container'>
          <p>Resultado da Conversão - Cotação do dia</p>
          <hr />
          <h5>Data da consulta</h5>
          <p className='data'>Inserir data </p>
        </div>

        <div className='results-container'>
          <div className='dollar'>
            <h5>Dolar</h5>
            <p>{dollarValue}</p>
          </div>
          <div className='euro'>
            <h5>Euro</h5>
            <p>{euroValue}</p>
          </div>

          <div className='real'>
            <h5>Real</h5>
            <p>{realValue}</p>
          </div>
        </div>

        <div className='footer'>
          <hr />
          <p>{now.getFullYear()} - ConversorMoeda! </p>
        </div>
      </div>
    </>
  )
}
