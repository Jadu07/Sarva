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
      <section
        className="relative w-full min-h-[88vh] flex items-center justify-center border-b border-zinc-200 bg-white overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 border border-zinc-200 bg-zinc-50 px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 inline-block"></span>
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-zinc-700">Sarva OS v1.0</span>
          </span>
          <h1 className="text-[5.5rem] md:text-[9rem] font-black tracking-tighter leading-[0.88] uppercase text-zinc-900 mb-6">
            The Ultimate
            <span className="block text-zinc-300">OS Directory.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-zinc-500 font-medium leading-relaxed mb-12">
            Discover, compare, and download every major operating system. Minimal. Open. Grayscale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-10 py-4 bg-zinc-900 text-white text-[11px] font-black tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors"
            >
              Browse Directory
            </Link>
            <Link
              to="/downloads"
              className="w-full sm:w-auto px-10 py-4 border border-zinc-200 text-zinc-900 text-[11px] font-black tracking-[0.2em] uppercase hover:border-zinc-900 transition-colors"
            >
              Downloads
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}