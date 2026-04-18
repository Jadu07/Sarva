import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, HardDrive, Zap, Info } from 'lucide-react'
import { getOsById } from '../services/api'

export default function OsDetails() {
  const { id } = useParams()
  const [os, setOs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOs = async () => {
      try {
        setLoading(true)
        const data = await getOsById(id)
        setOs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOs()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 animate-pulse">Loading Details...</p>
      </div>
    )
  }

  if (error || !os) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
        <p className="text-xl font-bold uppercase text-red-500 mb-4">Error loading OS</p>
        <Link to="/explore" className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-900 border-b border-zinc-900 pb-1 flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" /> Back to Explore
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/explore" className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
          <ArrowLeft className="w-3 h-3" /> Back to Directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-zinc-200 pt-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-6 mb-10">
               {os.logo ? (
                <img src={os.logo} alt={os.name} className="w-20 h-20 object-contain grayscale" />
              ) : (
                <div className="w-20 h-20 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300">
                  <span className="text-[10px] font-black tracking-widest">N/A</span>
                </div>
              )}
              <div>
                <span className="inline-block px-2 py-1 border border-zinc-200 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 mb-3 bg-zinc-50">
                  {os.category?.name || 'OS'}
                </span>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
                  {os.name}
                </h1>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-4 border-b border-zinc-100 pb-2">
                About The System
              </h2>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                {os.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="border border-zinc-200 p-6 hover:border-zinc-500 transition-colors cursor-default">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mb-4 text-zinc-500">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase text-zinc-900 mb-2 mt-auto">Open & Verified</h3>
                  <p className="text-xs text-zinc-500 font-medium">All downloads link strictly to official, un-modified repositories for complete security.</p>
               </div>
               <div className="border border-zinc-200 p-6 hover:border-zinc-500 transition-colors cursor-default">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mb-4 text-zinc-500">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase text-zinc-900 mb-2 mt-auto">Modern Builds</h3>
                  <p className="text-xs text-zinc-500 font-medium">Get the latest and most stable builds suited for modern workflows.</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-zinc-200 p-8 bg-zinc-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-200 opacity-[0.15] blur-3xl rounded-full transform translate-x-10 -translate-y-10 group-hover:bg-zinc-300 transition-colors duration-500" />
              
              <h3 className="text-sm font-black tracking-[0.2em] uppercase text-zinc-900 mb-8 flex items-center gap-2 relative z-10">
                <HardDrive className="w-4 h-4 text-zinc-400" /> Technical Data
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-1">Version</p>
                  <p className="font-mono text-lg font-medium text-zinc-900 inline-block px-2 py-0.5 bg-zinc-200">{os.version}</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-1">System Size</p>
                  <p className="font-mono text-sm font-medium text-zinc-900 flex items-center gap-2">
                    {os.size || 'Variable / Dependenet'}
                  </p>
                </div>
                
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-1">Status</p>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> {os.status || 'Active'}
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-zinc-200 relative z-10">
                <Link to="/downloads" className="flex items-center justify-center w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-black tracking-[0.3em] uppercase transition-all active:scale-95 gap-2">
                  <Download className="w-4 h-4" /> Download ISO
                </Link>
                <p className="text-center text-[10px] text-zinc-400 font-medium tracking-wide mt-4">
                  Redirects to Downloads section
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
