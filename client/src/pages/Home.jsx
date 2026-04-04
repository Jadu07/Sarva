import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [featuredOs, setFeaturedOs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, osRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/os'),
        ])
        if (!catRes.ok || !osRes.ok) throw new Error('API error')
        setCategories(await catRes.json())
        setFeaturedOs((await osRes.json()).slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
    </div>
  )
}