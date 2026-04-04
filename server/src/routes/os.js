const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
  const { categoryId } = req.query
  try {
    const os = await prisma.oS.findMany({
      where: categoryId ? { categoryId } : {},
      include: { category: true },
      orderBy: { name: 'asc' }
    })
    res.json(os)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch OS distributions' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const os = await prisma.oS.findUnique({
      where: { id },
      include: { category: true }
    })
    if (!os) return res.status(404).json({ error: 'OS not found' })
    res.json(os)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch OS details' })
  }
})

module.exports = router
