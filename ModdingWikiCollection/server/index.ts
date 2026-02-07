import express from 'express'
import cors from 'cors'
import nexusImport from './nexusImport'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', nexusImport)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`)
})

