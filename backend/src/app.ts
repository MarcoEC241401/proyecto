import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import { env } from './config/env'
import { errorHandler } from './middlewares/errorHandler'
import authRoutes from './routes/auth.routes'
import attendanceRoutes from './routes/attendance.routes'
import reporteRoutes from './routes/reporte.routes'
import userRoutes from './routes/user.routes'

import './jobs/markAbsences.job'
import './jobs/sendDailyReport.job'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-psi-gold-21.vercel.app',
    'https://frontend-it3cbqf01-marcoec2414s-projects.vercel.app',
  ],
  credentials: true,
}))

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV })
})

app.use('/api/auth', authRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/reporte', reporteRoutes)
app.use('/api/reports', reporteRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

const start = async () => {
  await connectDB()
  const PORT = process.env.PORT || env.PORT || 8080
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
  })
}

start()

export default app