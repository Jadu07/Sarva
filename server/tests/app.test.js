const request = require('supertest')
const app = require('../src/app')
const { PrismaClient } = require('@prisma/client')

describe('GET /api/health', () => {
  it('Return 200 & OK', async () => {
    const res = await request(app).get('/api/health')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'ok')
  })
})

describe('Database Connection Test', () => {
  it('Should connect to MongoDB successfully', async () => {
    const prisma = new PrismaClient()
    await expect(prisma.$connect()).resolves.not.toThrow()
    await prisma.$disconnect()
  })
})

describe('API Routes Tests', () => {
  it('GET /api/categories should return 200 and an array', async () => {
    const res = await request(app).get('/api/categories')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/os should return 200 and an array', async () => {
    const res = await request(app).get('/api/os')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/explore should return 200 and include categories/featured', async () => {
    const res = await request(app).get('/api/explore')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('categories')
    expect(res.body).toHaveProperty('featured')
  })
})
