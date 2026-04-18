import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react'
import { getOsById } from '../services/api'

export default function Payment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [os, setOs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchOs = async () => {
      try {
        setLoading(true)
        const data = await getOsById(id)
        setOs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOs()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        navigate('/downloads')
      }, 2000)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 animate-pulse">
          Loading Checkout...
        </p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
        <CheckCircle className="w-12 h-12 text-emerald-500 mb-6" />
        <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mb-2">
          Payment Successful
        </h2>
        <p className="text-sm font-medium text-zinc-500">
          Redirecting to downloads...
        </p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white min-h-[80vh]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to={`/os/${id}`}
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Details
        </Link>
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase text-zinc-900 mb-2">
            Checkout
          </h1>
          <p className="text-sm font-medium text-zinc-500 flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-400" /> Secure encrypted payment
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 p-6 mb-8 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-1">
              Item
            </p>
            <p className="text-lg font-bold text-zinc-900 uppercase">
              {os?.name || 'Operating System'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-1">
              Total
            </p>
            <p className="font-mono text-xl font-bold text-emerald-600">
              {os?.pricing || '2999 INR'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-2">
                Card Details
              </label>
              <div className="border border-zinc-200 bg-white focus-within:border-zinc-900 transition-colors">
                <input
                  type="text"
                  required
                  placeholder="Card Number"
                  className="w-full p-4 text-sm font-mono outline-none border-b border-zinc-200 placeholder:text-zinc-300"
                />
                <div className="flex">
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    className="w-1/2 p-4 text-sm font-mono outline-none border-r border-zinc-200 placeholder:text-zinc-300"
                  />
                  <input
                    type="text"
                    required
                    placeholder="CVC"
                    className="w-1/2 p-4 text-sm font-mono outline-none placeholder:text-zinc-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 mb-2">
                Name on Card
              </label>
              <input
                type="text"
                required
                placeholder="Name"
                className="w-full p-4 text-sm font-medium outline-none border border-zinc-200 placeholder:text-zinc-300 focus:border-zinc-900 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 mt-8 bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-black tracking-[0.3em] uppercase transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {submitting ? 'Processing...' : `Pay ${os?.pricing || '2999 INR'}`}
          </button>
        </form>
      </div>
    </div>
  )
}
