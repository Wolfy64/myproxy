import express from 'express'
import * as goDaddy from './goDaddy'
const services = express.Router()

const getDomainsByProvider = (provider: string) => {
  switch (provider) {
    case 'GODADDY': return goDaddy.getDomains()
    default: return 'Provider not supported yet'
  }
}

services.get('/domains', async (_, res) => {
  const data = await Promise.all([goDaddy.getDomains()])
  return res.json(data) // Data send to view providers ?
})
services.get('/domains/:provider', async (req, res) => {
  const { provider } = req.params
  const data = await getDomainsByProvider(provider.toUpperCase())
  res.json(data) // Data send to view provider ?
})

export { services }
