import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = 'mongodb+srv://decuxopx12_db_user:iwNu0zKEEpJ4hxUl@marcoec.flh6xyq.mongodb.net/attendance?retryWrites=true&w=majority&appName=MarcoEC'

const resetear = async () => {
  console.log('Conectando...')
  await mongoose.connect(MONGODB_URI)
  console.log('Conectado')
  
  const hash = await bcrypt.hash('admin123', 10)
  
  const result = await mongoose.connection.collection('users').updateOne(
    { email: 'decuxop@gmail.com' },
    { $set: { passwordHash: hash } }
  )
  
  console.log('Resultado:', result.modifiedCount, 'documentos modificados')
  await mongoose.connection.close()
}

resetear().catch(console.error)