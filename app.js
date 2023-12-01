const express = require('express')
const tokens = require('./utils/tokens')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/payments-api/4.0/service.payment', (req, res) => {
  const { callback } = req.query;

  const jsonResponse = `${callback}([
    {id:11, name:'MASTERCARD'},
    {id:99, name:'TEST_CREDIT_CARD'},
    {id:44, name:'VISA'},
    {id:22, name:'DINERS'},
    {id:12, name:'AMEX'},
    {id:45, name:'VISA_DEBIT'},
    {id:34, name:'OTHERS_CASH'},
    {id:23, name:'CODENSA'},
    {id:36, name:'BANK_REFERENCED'},
    {id:25, name:'PSE'},
    {id:37, name:'EFECTY'},
    {id:26, name:'ACH_DEBIT'},
    {id:27, name:'CASH_ON_DELIVERY'},
    {id:733, name:'BNPL'},
    {id:40, name:'CMR'},
    {id:41, name:'MASTERPASS'},
    {id:43, name:'MASTERCARD_DEBIT'},
    {id:32, name:'LENDING_INSTALLMENTS'},
  ])`;

  res.send(jsonResponse);
});

app.get('/payments-api/4.0/service.token', (req, res) => {
  const { callback, _card, maxTime, minTime } = req.query
  const payerId = _card ? _card.payer_id : undefined
  const method = _card ? _card.method : undefined
  const token = tokens.generateUuid()
  const maxTimeout = maxTime ? maxTime : 60000
  const minTimeout = minTime ? minTime : 0

  const randomTimeout = Math.floor(Math.random() * (maxTimeout - minTimeout + 1)) + minTimeout;

  const jsonResponse = `${callback}({
    "token": "${token}",
    "name": "APPROVED",
    "payer_id": "${payerId}",
    "method": "${method}",
    "document": "null",
    "randomTimeout": "${randomTimeout}"
  })`;

  setTimeout(() => {
    res.send(jsonResponse)
  }, randomTimeout)
});

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
