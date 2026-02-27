import express from "express"
import authRoutes from './routes/auth.routes.js'
import geoRoutes from './routes/geo.routes.js'

import 'dotenv/config'

const app = express()


app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/geo', geoRoutes)

export default app