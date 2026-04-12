const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
    const featured = await prisma.os.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    })
    res.json({ categories, featured })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
