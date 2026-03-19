import express from 'express'
import cors from 'cors'
import report from './routes/report.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', report)

app.listen(5000, () => console.log('Server Started at 5000'))