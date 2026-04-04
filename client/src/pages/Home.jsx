import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getCategories, getAllOs } from '../services/api'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [featuredOs, setFeaturedOs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)

        const osData = await getAllOs()
        setFeaturedOs(osData.slice(0, 3))
      } catch (err) {
        console.error('Failed to load home page data:', err)
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
        className="relative w-full flex items-center border-b border-zinc-200 bg-white overflow-hidden"
        style={{
          minHeight: '40vh',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-left w-full lg:w-auto">
            <span className="inline-flex items-center gap-2 border border-zinc-100 bg-zinc-50 px-3 py-1 mb-5">
              <span className="w-1 h-1 rounded-full bg-zinc-900 inline-block"></span>
              <span className="text-[9px] font-black tracking-[0.25em] uppercase text-zinc-550">
                Sarva OS v1.0
              </span>
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-zinc-900">
              The Ultimate <br />
              <span className="text-zinc-300">OS Directory.</span>
            </h1>
          </div>

          <div className="lg:max-w-md flex flex-col lg:items-end text-left lg:text-right w-full lg:w-auto">
            <p className="text-zinc-500 font-medium leading-relaxed mb-8 text-sm md:text-base">
              Discover and download every major operating system with a clean and minimal experience
              for modern users. <br className="hidden xl:block" />
              Minimal. Open. Unified.
            </p>
            <div className="flex flex-wrap items-center lg:justify-end gap-3">
              <Link
                to="/explore"
                className="px-8 py-3.5 bg-zinc-900 text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all active:scale-95"
              >
                Browse Directory
              </Link>
              <Link
                to="/downloads"
                className="px-8 py-3.5 border border-zinc-200 text-zinc-900 text-[10px] font-black tracking-[0.2em] uppercase hover:border-zinc-900 transition-all active:scale-95"
              >
                Downloads
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <section className="py-28 border-b border-zinc-100">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-3">
                Browse by type
              </p>
              <h2 className="text-4xl font-black tracking-tighter uppercase text-zinc-900">
                Categories
              </h2>
            </div>
            <Link
              to="/explore"
              className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group relative overflow-hidden border border-zinc-200 p-10 bg-white hover:border-zinc-900 transition-colors duration-300"
              >
                <div className="mb-8">
                  {cat.icon ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-11 h-11 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-11 h-11 bg-zinc-100" />
                  )}
                </div>
                <h3 className="text-xl font-black tracking-tight text-zinc-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-zinc-400 font-medium">All {cat.name} distributions</p>
                {cat.icon && (
                  <img
                    src={cat.icon}
                    alt=""
                    aria-hidden="true"
                    className="absolute -bottom-8 -right-8 w-40 h-40 grayscale opacity-[0.04] pointer-events-none select-none"
                  />
                )}
                <ArrowRight className="absolute top-10 right-10 w-5 h-5 text-zinc-200 group-hover:text-zinc-900 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        <section className="py-28 border-b border-zinc-100">
          <div className="mb-12">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-3">
              Popular picks
            </p>
            <h2 className="text-4xl font-black tracking-tighter uppercase text-zinc-900">
              Featured Distributions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredOs.map((os) => (
              <div
                key={os.id}
                className="group border border-zinc-200 p-8 bg-white hover:border-zinc-900 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 border border-zinc-100 px-2 py-1">
                    {os.category?.name ?? 'OS'}
                  </span>
                  {os.logo && (
                    <img
                      src={os.logo}
                      alt={os.name}
                      className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 mb-2">{os.name}</h3>
                <p className="text-sm text-zinc-500 font-medium line-clamp-2 mb-8">
                  {os.description}
                </p>
                <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
                  <span className="text-xs font-mono font-bold text-zinc-400">{os.version}</span>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-28">
          <div className="bg-zinc-900 p-12 md:p-20 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white mb-5">
                100% Free & Open Source.
              </h2>
              <p className="max-w-xl mx-auto text-zinc-400 font-medium leading-relaxed mb-10">
                No mirrors, no modified ISOs. Every download links directly to official, verified
                sources from each distribution's maintainers.
              </p>
              <Link
                to="/explore"
                className="inline-block px-12 py-4 bg-white text-zinc-900 text-xs font-black tracking-[0.2em] uppercase hover:bg-zinc-100 transition-colors"
              >
                Access the Directory
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
