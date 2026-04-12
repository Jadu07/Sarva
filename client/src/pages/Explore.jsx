import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getExploreData, getAllOs } from '../services/api'

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [categories, setCategories] = useState([])
  const [osList, setOsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (!categoryParam) {
          const { categories: cats, featured } = await getExploreData()
          setCategories(cats)
          setOsList(featured)
        } else {
          // If a category is selected, we only want OS for that category
          // but we still need the categories list for the sidebar
          const [{ categories: cats }, osData] = await Promise.all([
            getExploreData(),
            getAllOs(categoryParam)
          ])
          setCategories(cats)
          setOsList(osData)
        }
      } catch (error) {
        console.error('Error fetching explore data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [categoryParam])

  return (
    <div className="w-full bg-white text-zinc-900 min-h-screen">
      {/* Page Header */}
      <section className="border-b border-zinc-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-2">Directory</p>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Explore</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Category Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-6">Filter by Type</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSearchParams({})}
              className={`text-left px-4 py-3 text-xs font-black tracking-[0.1em] uppercase transition-all border ${
                !categoryParam 
                ? 'bg-zinc-900 text-white border-zinc-900' 
                : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-900 hover:text-zinc-900'
              }`}
            >
              All Types
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={`text-left px-4 py-3 text-xs font-black tracking-[0.1em] uppercase transition-all border ${
                  categoryParam === cat.id 
                  ? 'bg-zinc-900 text-white border-zinc-900' 
                  : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-900 hover:text-zinc-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>
        
        {/* We will build the OS Grid here */}
        <div className="flex-1 min-h-[50vh]">
          {loading ? (
             <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">Loading...</p>
          ) : (
             <p className="text-sm">Found {osList.length} distributions</p>
          )}
        </div>
      </div>
    </div>
  )
}
