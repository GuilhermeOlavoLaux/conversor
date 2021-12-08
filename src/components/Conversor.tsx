import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { valuesApi } from '../api/routes'

export default function Conversor() {
  const [selectedCoin, setSelectedCoin] = useState<string>()

  const [dollarValue, setDollarValue] = useState<string>('')
  const [euroValue, setEuroValue] = useState<string>('')

  const [realValue, setRealValue] = useState<string>('')

  const now = new Date()

  async function setValues(coin: string) {
    if (coin === 'BRL') {
      await valuesApi.get(`/${coin}-USD`).then((res) => {
        setDollarValue(res.data.BRLUSD.high)
      })
      await valuesApi.get(`/${coin}-EUR`).then((res) => {
        setEuroValue(res.data.BRLEUR.high)
      })
    }
    if (coin === 'USD') {
      await valuesApi.get(`/${coin}-EUR`).then((res) => {
        setEuroValue(res.data.USDEUR.high)
      })
      await valuesApi.get(`/${coin}-BRL`).then((res) => {
        setRealValue(res.data.USDBRL.high)
      })
    }

    if (coin === 'EUR') {
      await valuesApi.get(`/${coin}-USD`).then((res) => {
        setDollarValue(res.data.EURUSD.high)
      })
      await valuesApi.get(`/${coin}-BRL`).then((res) => {
        setRealValue(res.data.EURBRL.high)
      })
    }
  }

  function getCoinValue(coin: string) {
    if (coin === 'undefined') {
      console.log('erro')
    } else {
      setValues(coin)
    }
  }

  return (
    <>
      <div className='conversor-container'>
        <p>Informe o valor e a moeda para conversão</p>
        <hr />

        <Form.Group controlId='formBasicSelect' className='bootstrap-field'>
          <h5>Valor</h5>
          <Form.Control type='number' placeholder='Enter email' />
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

        <p>Resultado da Conversão - Cotação do dia</p>
        <hr />

        <h5>Data da consulta</h5>
        <p>Inserir data </p>

        <h5>Moeda selecionada</h5>
        <p>Inserir moeda</p>

        <h5>Real</h5>
        <p>Inserir real:</p>

        <p>Real {realValue}</p>

        <p>Dolar {dollarValue}</p>
        <p>Euro {euroValue}</p>

        <hr />
        <p>{now.getFullYear()} - BuscadorCEP! </p>
      </div>
    </>
  )
}
