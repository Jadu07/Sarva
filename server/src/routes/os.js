const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
  const { categoryId } = req.query
  try {
    const os = await prisma.os.findMany({
      where: categoryId ? { categoryId } : {},
      include: { category: true },
      orderBy: { name: 'asc' }
    })
    res.json(os)
  } catch (error) {
    console.error('Error fetching OS distributions:', error)
    res.status(500).json({ error: 'Failed to fetch OS distributions', details: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const os = await prisma.os.findUnique({
      where: { id },
      include: { category: true }
    })
    if (!os) return res.status(404).json({ error: 'OS not found' })
    res.json(os)
  } catch (error) {
    console.error(`Error fetching OS details for id ${id}:`, error)
    res.status(500).json({ error: 'Failed to fetch OS details', details: error.message })
  }
})

module.exports = router
