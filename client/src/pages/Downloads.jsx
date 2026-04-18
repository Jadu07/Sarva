import { Loader2, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOs } from '../services/api'

export default function Downloads() {
  const navigate = useNavigate()
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllOs()
      .then(setDownloads)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 py-24 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            Releases and Downloads
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Explore our complete directory of officially supported operating systems. Select your
            preferred platform and architecture to securely download the latest release.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden min-h-[400px] relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
              <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                  <th className="py-4 px-6">System</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Version</th>
                  <th className="py-4 px-6">Size</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 text-sm">
                {downloads.map(({ id, logo, name, category, status, version, updatedAt, size }) => (
                  <tr
                    key={id}
                    onClick={() => navigate(`/os/${id}`)}
                    className="hover:bg-zinc-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="py-5 px-6 whitespace-nowrap min-w-[200px]">
                      <div className="flex items-center gap-3 font-medium text-zinc-900">
                        <div className="w-10 h-10 p-2 bg-zinc-100 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-zinc-200 flex items-center justify-center">
                          {logo ? (
                            <img src={logo} alt={name} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-5 h-5 bg-zinc-300" />
                          )}
                        </div>
                        <span>{name}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-zinc-600 font-medium whitespace-nowrap">
                      {category?.name || 'Unknown'}
                    </td>

                    <td className="py-5 px-6 text-zinc-600 whitespace-nowrap">
                      <span className="inline-flex items-center bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
                        {status}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-zinc-500 font-mono text-xs whitespace-nowrap">
                      {version}
                      {updatedAt && (
                        <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">
                          {new Date(updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                    </td>

                    <td className="py-5 px-6 text-zinc-500 whitespace-nowrap">{size}</td>

                    <td className="py-5 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/os/${id}`)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 font-medium active:scale-95 text-xs shadow-sm group-hover:shadow"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy Now
                      </button>
                    </td>
                  </tr>
                ))}

                {!loading && downloads.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-zinc-500">
                      No operating systems found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center md:text-left">
          <p className="text-sm text-zinc-400">
            By downloading, you agree to our Terms of Service and Privacy Policy. All downloads are
            generated securely.
          </p>
        </div>
      </div>
    </div>
  )
}
