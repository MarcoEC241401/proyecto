import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || ''

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const obtenerResumen = async (fecha: string) => {
  const { data } = await axios.get(`${BASE}/api/attendance/resumen?fecha=${fecha}`, getHeaders())
  return data
}

export const descargarExcel = async (fecha: string) => {
  const response = await axios.get(`${BASE}/api/reports/download?fecha=${fecha}`, {
    ...getHeaders(),
    responseType: 'blob',
  })
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `reporte-${fecha}.xlsx`)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

export const enviarReportePorCorreo = async (fecha: string, destinatario: string) => {
  const { data } = await axios.post(
    `${BASE}/api/reporte`,
    { fecha, destinatario },
    getHeaders()
  )
  return data
}