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

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 flex-shrink-0">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-6">
            Filter by Type
          </p>
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

        <div className="flex-1 min-h-[50vh]">
          <div className="mb-8 flex items-center justify-between border-b border-zinc-100 pb-4">
            <p className="text-zinc-500 font-medium text-sm">
              {loading ? 'Searching directory...' : `Showing ${osList.length} distributions`}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[30vh]">
              <p className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 animate-pulse">
                Loading Directory...
              </p>
            </div>
          ) : osList.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] border border-dashed border-zinc-200 bg-zinc-50">
              <p className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 mb-2">
                No Results
              </p>
              <p className="text-sm text-zinc-500 font-medium">
                No distributions found for this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {osList.map((os) => (
                <div
                  key={os.id}
                  className="group flex flex-col border border-zinc-200 p-8 bg-white hover:border-zinc-900 transition-colors cursor-pointer justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 border border-zinc-100 px-2 py-1">
                        {os.category?.name ?? 'OS'}
                      </span>
                      {os.logo ? (
                        <img
                          src={os.logo}
                          alt={os.name}
                          className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-zinc-100" />
                      )}
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-zinc-900 mb-2">
                      {os.name}
                    </h3>
                    <p className="text-sm text-zinc-500 font-medium line-clamp-3 mb-8">
                      {os.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-5 mt-auto">
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {os.version || 'v1.0'}
                    </span>
                    <Link
                      to={`/downloads`}
                      className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1"
                    >
                      Download <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
