import express from 'express'
import cors from 'cors'

import { router } from './routes/v1/index'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/', router)


app.listen(process.env.APP_PORT, () => {
  console.log('Running.....')
  console.log(`Conectado en ambiente de: ${process.env.ENV_TYPE as string}`)
  console.log(`Server running on port ${process.env.APP_PORT as string}`)
})